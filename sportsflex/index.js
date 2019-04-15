// index.js
// kinvey flex for Sports app
// mauricio dos santos
// march 12 2019

const sdk = require('kinvey-flex-sdk');
const progressCore = require('./jsdo/progress.core');
const ngDataSource = require('./jsdo/progress.data.node');

const serviceURI = 'http://ec2-34-228-170-4.compute-1.amazonaws.com:8080';
const catalogURI = 'http://ec2-34-228-170-4.compute-1.amazonaws.com:8080/static/SportsREST.json';
const username = 'm';
const password = 'm';

sdk.service ((err, flex) => {

    // JSDO needs to know temp-table
    const tables = {
        'SalesReps': 'ttSalesRep',
        'Customers': 'ttCustomer',
        'Orders': 'ttOrder',
        'OrderLines': 'ttOrderLine',
        'Items': 'ttItem',
        'States': 'ttState'
    };

    // for JSDO update, need to know key field
    const keys = {
        'Customers': ['CustNum'],
        'Orders': ['Ordernum'],
        'OrderLines': ['Ordernum','Linenum']
    }

    registerServiceObject('SalesReps','R');
    registerServiceObject('Customers','RU');
    registerServiceObject('Orders','CRUD');
    registerServiceObject('OrderLines','CRUD');
    registerServiceObject('Items','R');
    registerServiceObject('States','R');

    flex.functions.register('GetOrderDetail',GetOrderDetail);
    flex.functions.register('myDataStoreModuleTest',myDataStoreModuleTest);

    function registerServiceObject (name,operations) {
        const obj = flex.data.serviceObject(name);
        if (operations.indexOf('C') > -1) {
            obj.onInsert(insert);
        }
        if (operations.indexOf('R') > -1) {
            obj.onGetAll(getByQuery);
            obj.onGetByQuery(getByQuery);
            obj.onGetById(getById);
        }
        if (operations.indexOf('U') > -1) {
            obj.onUpdate(update);
        }
        if (operations.indexOf('D') > -1) {
            obj.onDeleteByQuery(deleteByQuery);
        }
    }

    function mapQueryToJFP (query) {
        console.log('mapQueryToJFP',query);
        // set JFP params for OpenEdge based on Kinvey's mongoDB query params
        // see https://docs.mongodb.com/manual/tutorial/query-documents/
        // ablFilter: filter or where clause without WHERE keyword
        let ablFilter = '';
        if (query && query.query) {
            let q = JSON.parse(query.query);
            for (k in q) {
                let v = q[k];
                console.log('======= k ======',k);
                console.log('======= v ======',v);
                if (ablFilter) ablFilter = ablFilter + ' AND ';
                if (v.$regex)
                    ablFilter = ablFilter + k + ' MATCHES "*' + v.$regex.substr(1) + '*"';
                else
                    ablFilter = ablFilter + k + ' = "' + v + '"';
                // need to implement other comparison operators
            }
        }
        return ablFilter;
    }

    function getByQuery (context, complete, modules) {
        console.log('getByQuery query',JSON.stringify(context.query));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);

        // ablFilter: query filter params
        let ablFilter = mapQueryToJFP(context.query);

        // skip: number of records to skip
        const skip = (context.query) ? Number(context.query.skip) || 0 : 0;

        // top: number of records to read (mongo calls it limit)
        const top = (context.query) ? Number(context.query.limit) || 25 : 25;

        // orderBy
        let orderBy = '';
        if (context.query && context.query.sort) {
            let s = JSON.parse(context.query.sort);
            for (k in s) if (k !== '_id') orderBy = orderBy + k;
            // need to implement ASC or DESC and multiple fields
        }

        console.log('ablFilter', ablFilter);
        console.log('skip', skip);
        console.log('top', top);
        console.log('orderBy', orderBy);

        progressCore.progress.data.getSession({
            name: 'sportsflex',
            serviceURI: serviceURI,
            catalogURI: catalogURI,
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_BASIC,
            username: username,
            password: password,
        }).then(()=>{
            const jsdo = new progressCore.progress.data.JSDO({
                name: context.serviceObjectName
            });
            const ds = new ngDataSource.DataSource({
                jsdo: jsdo,
                tableRef: tables[context.serviceObjectName]
            });
            return ds.read(
                filter=JSON.stringify({
                    ablFilter: ablFilter,
                    orderBy: orderBy,
                    top: top,
                    skip: skip
                })
            ).toPromise();
        }).then((response) => {
            console.log('number of records retrieved',response.data.length);
            complete().setBody(JSON.stringify(response.data)).ok().next();
        }).catch((err) => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });
    }

    function insert (context, complete, modules) {
        console.log('insert context',JSON.stringify(context));
        console.log('insert body',JSON.stringify(context.body));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);

        progressCore.progress.data.getSession({
            name: 'sportsflex',
            serviceURI: serviceURI,
            catalogURI: catalogURI,
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_BASIC,
            username: username,
            password: password,
        }).then(() => {
            const jsdo = new progressCore.progress.data.JSDO({
                name: context.serviceObjectName
            });
            const ds = new ngDataSource.DataSource({
                jsdo: jsdo,
                tableRef: tables[context.serviceObjectName]
            });
            ds.create(context.body);
            return ds.saveChanges().toPromise();
        }).then((response) => {
            if (response.dsOrder) {
                console.log('record created (Order)',response.dsOrder.ttOrder[0].Ordernum);
                complete().setBody(JSON.stringify(response.dsOrder.ttOrder[0])).ok().next();
            }
            else if (response.dsOrderLine) {
                console.log('record created (OrderLine)',response.dsOrderLine.ttOrderLine[0].Ordernum);
                complete().setBody(JSON.stringify(response.dsOrderLine.ttOrderLine[0])).ok().next();
            }
            else {
                console.log('record created (other)',response);
                complete().setBody(JSON.stringify(response)).ok().next();
            }
        }).catch((err) => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });
    }

    function update (context, complete, modules) {
        console.log('update context',JSON.stringify(context));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);

        // filter: query filter
        let key = keys[context.serviceObjectName];
        let filter = '';
        for (let i=0; i<key.length; i++) {
            if (filter) filter = filter + ' AND ';
            filter = filter + key[i] + ' = "' + context.body[key[i]] + '"';
        }
        
        progressCore.progress.data.getSession({
            name: 'sportsflex',
            serviceURI: serviceURI,
            catalogURI: catalogURI,
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_BASIC,
            username: username,
            password: password,
        }).then(() => {
            jsdo = new progressCore.progress.data.JSDO({
                name: context.serviceObjectName
            });
            ds = new ngDataSource.DataSource({
                jsdo: jsdo,
                tableRef: tables[context.serviceObjectName]
            });
            return ds.read(filter=filter).toPromise();
        }).then((response) => {
            console.log('number of records retrieved',response.data.length);
            if (response.data.length === 0)
                throw({message:'no records found to update'});
            let body = context.body;
            body._id = response.data[0]._id;
            this.ds.update(body);
            return this.ds.saveChanges().toPromise();
        }).then((result) => {
            console.log('========== record updated',result);
            complete().setBody('RECORD UPDATED').ok().next();
        }).catch((err) => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });        
    }

    function deleteByQuery (context, complete, modules) {
        console.log('deleteByQuery context',JSON.stringify(context));
        console.log('deleteByQuery query',JSON.stringify(context.query));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);

        // ablFilter: query filter params
        let ablFilter = mapQueryToJFP(context.query);
        
        progressCore.progress.data.getSession({
            name: 'sportsflex',
            serviceURI: serviceURI,
            catalogURI: catalogURI,
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_BASIC,
            username: username,
            password: password,
        }).then(() => {
            jsdo = new progressCore.progress.data.JSDO({
                name: context.serviceObjectName
            });
            ds = new ngDataSource.DataSource({
                jsdo: jsdo,
                tableRef: tables[context.serviceObjectName]
            });
            return ds.read(
                filter=JSON.stringify({ablFilter: ablFilter})
            ).toPromise();
        }).then((response) => {
            console.log('number of records retrieved',response.data.length);
            if (response.data.length === 0)
                throw({message:'no records found to delete'});
            this.ds.remove({_id: response.data[0]._id});
            return this.ds.saveChanges().toPromise();
        }).then(() => {
            console.log('record deleted');
            complete().setBody('RECORD DELETED').ok().next();
        }).catch((err) => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });
    }

    function getById (context, complete, modules) {
        console.log('getById context',JSON.stringify(context));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);
        console.log('entityId',context.entityId);
        complete().setBody('ENTITY TO BE RETURNED').ok().next();
    }

    function GetOrderDetail (context, complete, modules) {
        console.log('GetOrderDetail context',JSON.stringify(context));
        console.log('GetOrderDetail body',JSON.stringify(context.body));

        progressCore.progress.data.getSession({
            name: 'sportsflex',
            serviceURI: serviceURI,
            catalogURI: catalogURI,
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_BASIC,
            username: username,
            password: password,
        }).then(()=>{
            const jsdo = new progressCore.progress.data.JSDO({
                name: 'Orders'
            });
            return jsdo.invoke('GetOrderDetail',context.body);
        }).then((jsdo) => {
            console.log('jsdo.request.response',jsdo.request.response);
            complete().setBody(jsdo.request.response.dsOrderDetail).ok().next();
        }).catch((jsdo) => {
            const err = JSON.parse(jsdo.request.xhr.responseText);
            console.log('err',err);
            complete(err._errors[0]._errorMsg).runtimeError().next();
        });
    }

    function myDataStoreModuleTest (context, complete, modules) {
        console.log('myDataStoreModuleTest MASTER APP KEY',modules.backendContext.getAppKey());
        console.log('myDataStoreModuleTest MASTER APP SECRET',modules.backendContext.getAppSecret());
        console.log('myDataStoreModuleTest MASTER SECRET',modules.backendContext.getMasterSecret());
        const ds = modules.dataStore({useBl:false,useUserContext:false});
        const StatesDS = ds.collection('SalesReps');
        StatesDS.findById('5c3e645fa537af73b7b6dc8f', function (err, result) {
            if (err) {
                console.log('============ err ============',err);
                return complete(err).runtimeError().done();
            }
            console.log('========= result ==========',result);
            complete().setBody(result).ok().next();
        });        
    }
});
