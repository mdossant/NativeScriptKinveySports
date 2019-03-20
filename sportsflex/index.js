// index.js
// kinvey flex for Sports app
// mauricio dos santos
// march 12 2019

const sdk = require('kinvey-flex-sdk');
const progressCore = require('./jsdo/progress.core');
const ngDataSource = require('./jsdo/progress.data.node');

const serviceURI = 'http://ec2-3-80-82-104.compute-1.amazonaws.com:8080';
const catalogURI = 'http://ec2-3-80-82-104.compute-1.amazonaws.com:8080/static/SportsREST.json';
const username = 'm';
const password = 'm';

sdk.service ((err, flex) => {
    const tables = {
        'SalesReps': 'ttSalesRep',
        'Customers': 'ttCustomer',
        'Orders': 'ttOrder',
        'OrderLines': 'ttOrderLine',
        'Items': 'ttItem',
        'States': 'ttState'
    };

    registerServiceObject('SalesReps','R');
    registerServiceObject('Customers','R');
    registerServiceObject('Orders','CRUD');
    registerServiceObject('OrderLines','CRUD');
    registerServiceObject('Items','R');
    registerServiceObject('States','R');

    flex.functions.register('GetOrderDetail',GetOrderDetail);

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
                if (ablFilter) ablFilter = ablFilter + ' AND ';
                ablFilter = ablFilter + k + '="' + q[k] + '"';
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
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_ANON
            //username: username,
            //password: password,
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
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_ANON
            //username: username,
            //password: password,
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
                console.log('record created',response.dsOrder.ttOrder[0].Ordernum);
                complete().setBody(JSON.stringify(response.dsOrder.ttOrder[0])).ok().next();
        }).catch((err) => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });
    }

    function update (context, complete, modules) {
        console.log('update context',JSON.stringify(context));
        console.log('update query',JSON.stringify(context.query));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);
        console.log('record updated');
        complete().setBody(JSON.stringify('RECORD PSEUDO UPDATED')).ok().next();
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
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_ANON
            //username: username,
            //password: password,
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
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_ANON
            //username: username,
            //password: password,
        }).then(()=>{
            const jsdo = new progressCore.progress.data.JSDO({
                name: 'Orders'
            });
            return jsdo.invoke('GetOrderDetail',context.body);
        }).then((jsdo) => {
            console.log('jsdo.request.response',jsdo.request.response);
            complete().setBody(jsdo.request.response.dsOrderDetail).ok().next();
        }).catch((err) => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });
    }
});