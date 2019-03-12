// index.js
// kinvey flex for Sports app
// mauricio dos santos
// march 12 2019

const sdk = require('kinvey-flex-sdk');
const progressCore = require('./jsdo/progress.core');
const ngDataSource = require('./jsdo/progress.data.node');

const serviceURI = 'http://ec2-3-80-82-104.compute-1.amazonaws.com:8080';
const catalogURI = 'http://ec2-3-80-82-104.compute-1.amazonaws.com:8080/static/SportsREST.json';

sdk.service((err, flex) => {
    const data = flex.data;

    const tables = {
        'SalesReps': 'ttSalesRep',
        'Customers': 'ttCustomer',
        'Orders': 'ttOrder',
        'OrderLines': 'ttOrderLine',
        'Items': 'ttItem',
        'States': 'ttState'
    };

    registerServiceObject('SalesReps');
    registerServiceObject('Customers');
    registerServiceObject('Orders');
    registerServiceObject('OrderLines');
    registerServiceObject('Items');
    registerServiceObject('States');

    function registerServiceObject (name) {
        const obj = data.serviceObject(name);
        obj.onGetAll(getAll);
        obj.onGetByQuery(getAll);
        obj.onGetById(getById);
    }

    function getAll(context, complete, modules) {
        console.log('getAll query',JSON.stringify(context.query));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);

        // set JFP params for OpenEdge based on Kinvey's mongoDB query params
        // see https://docs.mongodb.com/manual/tutorial/query-documents/
        // ablFilter: filter or where clause without WHERE keyword
        let ablFilter = '';
        if (context.query && context.query.query) {
            let q = JSON.parse(context.query.query);
            for (k in q) {
                if (ablFilter) ablFilter = ablFilter + ' AND ';
                ablFilter = ablFilter + k + '="' + q[k] + '"';
                // need to implement other comparison operators
            }
        }

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

        const session = progressCore.progress.data.getSession({
            name: 'sportsflex',
            serviceURI: serviceURI,
            catalogURI: catalogURI,
            authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_ANON
            //username: 'm',
            //password: 'm',
        }).then(session => {
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
        }).then(response => {
            console.log('number of records retrieved',response.data.length);
            complete().setBody(JSON.stringify(response.data)).ok().next();
        }).catch(err => {
            console.log('err.message',err.message);
            console.log('err.stack',err.stack);
            complete(err).runtimeError().next();
        });
    }

    function getById(context, complete, modules) {
        console.log('getById context',JSON.stringify(context));
        console.log('service object', context.serviceObjectName);
        console.log('table', tables[context.serviceObjectName]);
        console.log('entityId',context.entityId);
        let entity = [{
            "_id": "8",
            "SalesRep": "RDR",
            "RepName": "Robert Flex",
            "Region": "Austria",
            "MonthQuota": [4200, 4326, 4456, 4590, 4728, 4870, 5016, 5166, 5321, 5481, 5645, 5814],
            "_acl": {
                "creator": "kid_B1fDHsXzN"
            },
            "_kmd": {
                "lmt": "2019-01-15T22:53:19.413Z",
                "ect": "2019-01-15T22:53:19.413Z"
            }
        }];
        if (!entity)
          return complete().notFound('The entity could not be found').next();
        else
          return complete().setBody(JSON.stringify(entity)).ok().next();
    }
});