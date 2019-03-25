// app: Sports
// class: net
// purpose: network operations
// author: mauricio dos santos
// date: january 12 2019

import { app } from './app';
import { Injectable } from '@angular/core';
import { Kinvey } from 'kinvey-nativescript-sdk';

@Injectable()

export class net {

    private SalesRepsDS = Kinvey.DataStore.collection<any>('SalesReps');
    private CustomersDS = Kinvey.DataStore.collection<any>('Customers');
    private OrdersDS = Kinvey.DataStore.collection<any>('Orders');
    private OrderLinesDS = Kinvey.DataStore.collection<any>('OrderLines');
    private ItemsDS = Kinvey.DataStore.collection<any>('Items');
    private ItemImagesDS = Kinvey.DataStore.collection<any>('ItemImages');
    private userName: String;
    private skip;

    public constructor (private app: app) {
        console.log('net constructor');
        Kinvey.init({
            appKey: this.app.props.appKey,
            appSecret: this.app.props.appSecret
        });
    }

    // ===== authenticate =====
    // userName (string): user login id
    // password (string): password
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public authenticate (params) {
        console.log('net authenticate',params.userName,params.password);
        Kinvey.ping()
        .then((response) => {
            console.log('Kinvey Ping Success',response.version,response.kinvey);
            Kinvey.User.logout()
            .then(()=>{
                console.log('Kinvey Logout Successful');
                Kinvey.User.login(params.userName,params.password)
                .then((user: Kinvey.User) => {
                    console.log('Kinvey Login Successful',user);
                    this.userName = params.userName;
                    this.getSalesRep({
                        SalesRep: this.userName,
                        onSuccess: (RepName) => params.onSuccess(RepName)
                    });
                })
                .catch((error) => {
                    console.error('Kinvey Login Failed',error.name);
                    params.onError();
                });
            })
            .catch((error) => {
                console.error('Kinvey Logout Failed',error.name);
                params.onError();
            });
        })
        .catch((error) => {
            console.error('Kinvey Ping Failed',error.name);
            params.onError();
        });
    }

    // ===== getCustomers =====
    // loadMoreItems (boolean): load next batch or first batch
    // sortField (string): field on which to sort entities
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getCustomers (params) {
        console.log('net getCustomers');
        if (params.loadMoreItems)
            this.skip = this.skip + this.app.props.limit;
        else
            this.skip = 0;
        let data = [];
        let query = new Kinvey.Query;
        query.equalTo('SalesRep',this.userName);
        query.skip = this.skip;
        query.limit = this.app.props.limit;
        query.fields = ['CustNum','Name'];
        query.ascending(params.sortField);
        this.CustomersDS.find(query).subscribe(
            (customers) => {
                console.log('------------ RESULTS # -----------',customers.length);
                data = customers;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------- ERROR fetching customers -------------',error.name);
                if (data.length > 0)
                    params.onSuccess(data);
                else
                    params.onError();
                return;
            },
            () => params.onSuccess(data)
        );
    }

    // ===== getCustomer =====
    // _id (string): customer entity id
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getCustomer (params) {
        console.log('net getCustomers',params._id);
        let data = {};
        this.CustomersDS.findById(params._id).subscribe(
            (customer) => {
                console.log('------------ CUSTOMER -----------',customer);
                data = customer;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching customer --------------',error.name);
                if (data)
                    params.onSuccess(data);
                else
                    params.onError();
                return;
            },
            () => params.onSuccess(data)
        );
    }

    // ===== getSalesRep =====
    // SalesRep (string): sales rep 3-letter acronym
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getSalesRep (params) {
        console.log('net getSalesRep',params.SalesRep);
        let data = [];
        let query = new Kinvey.Query;
        query.equalTo('SalesRep',params.SalesRep);
        query.fields = ['RepName'];
        this.SalesRepsDS.find(query).subscribe(
            (rep) => {
                console.log('------------ SALES REP -----------',rep);
                data = rep;
            },
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching sales rep ------------',error.name);
                if (data.length > 0)
                    params.onSuccess(data[0].RepName);
                else
                    params.onError();
                return;
            },
            () => params.onSuccess(data[0].RepName)
        );
    }

    // ===== getOrders =====
    // CustNum (string): customer number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getOrders (params) {
        console.log('net getOrders',params.CustNum);
        let data = [];
        let query = new Kinvey.Query;
        query.equalTo('CustNum',Number(params.CustNum));
        query.limit = this.app.props.limit;
        query.fields = ['Ordernum','OrderDate','OrderStatus'];
        query.ascending('OrderDate');
        this.OrdersDS.find(query).subscribe(
            (orders) => {
                console.log('------------ RESULTS # -----------',orders.length);
                data = orders;
            },
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching orders -------------',error.name,data.length);
                if (data.length > 0)
                    params.onSuccess(data);
                else
                    params.onError();
                return;
            },
            () => params.onSuccess(data)
        );
    }

    // ===== getOrderLines =====
    // Ordernum (string): order number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getOrderLines (params) {
        console.log('net getOrderLines',params.Ordernum);
        let data = [];
        let query = new Kinvey.Query;
        query.equalTo('Ordernum',Number(params.Ordernum));
        query.limit = this.app.props.limit;
        query.fields = ['Linenum','Itemnum','Price','Qty'];
        query.ascending('Linenum');
        this.OrderLinesDS.find(query).subscribe(
            (lines) => {
                console.log('------------ RESULTS # -----------',lines.length);
                data = lines;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching order lines -------------',error.name);
                if (data.length > 0)
                    params.onSuccess(data);
                else
                    params.onError();
                return;
            },
            () => params.onSuccess(data)
        );
    }

    // ===== getOrderDetail =====
    // Ordernum (string): order number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getOrderDetail (params) {
        console.log('net getOrderDetail',params.Ordernum);
        Kinvey.CustomEndpoint.execute('GetOrderDetail',{Ordernum: params.Ordernum})
        .then(function(response) {
            console.log('------------ dsOrderDetail -----------',(<any>response).dsOrderDetail);
            params.onSuccess((<any>response).dsOrderDetail);
        })
        .catch(function(error) {
                console.error('------------ ERROR fetching order detail -------------',error.name);
                params.onError();
        });
    }

    // ===== getItem =====
    // Itemnum (string): item number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public getItem (params) {
        console.log('net getItem',params.Itemnum);
        let data = [];
        const query = new Kinvey.Query;
        query.equalTo('Itemnum',Number(params.Itemnum));
        this.ItemsDS.find(query).subscribe(
            (item) => {
                console.log('------------ RESULTS # -----------',item.length);
                data = item;
            },
            (error: Kinvey.BaseError) => {
                console.error('------------- ERROR fetching item --------------',error.name);
                if (data.length > 0)
                    params.onSuccess(data[0]);
                else
                    params.onError();
                return;
            },
            () => params.onSuccess(data[0])
        );
    }

    // ===== saveItem =====
    // itemData (string): item data
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public saveItem (params) {
        console.log('net saveItem');
        this.ItemsDS.save(params.itemData
        ).then((item) => {
            console.log('SAVED ITEM');
        }).catch((err)=> {
            console.error('------------- ERROR saving item -------------',err.name);
        });
    }    

    // ===== getItemImage =====
    // Itemnum (string): item number
    // onSuccess (method): success callback method
    public getItemImage (params) {
        console.log('net getItemImage',params.Itemnum);
        let data = [];
        const query = new Kinvey.Query;
        query.equalTo('Itemnum',Number(params.Itemnum));
        this.ItemImagesDS.find(query).subscribe(
            (itemImage) => {
                console.log('------------ RESULTS # -----------',itemImage.length);
                data = itemImage;
            },
            (error: Kinvey.BaseError) => {
                if (data.length > 0)
                    params.onSuccess(data[0]);
                else
                    params.onSuccess([]);
                return;
            },
            () => params.onSuccess(data[0])
        );
    }

    // ===== saveItemImage =====
    // _id (string): itemImage entity id, if available
    // Itemnum (string): item number
    // base64Image: base-64 encoded image data
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public saveItemImage (params) {
        console.log('net saveItemImage',params.Itemnum);
        this.ItemImagesDS.save({
            _id: params._id,
            Itemnum: Number(params.Itemnum),
            base64Image: params.base64Image
        }
        ).then((itemImage) => {
            console.log('SAVED ITEM IMAGE');
        }).catch((err)=> {
            console.error('------------- ERROR saving item image -------------',err.name);
            params.onError();
        });
    }    

    // ===== addOrder =====
    // CustNum (string): customer number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public addOrder (params) {
        console.log('net addOrder',params.CustNum);
        this.OrdersDS.save({
            CustNum: Number(params.CustNum)
        }
        ).then((order) => {
            console.log('SAVED ORDER - INSERT',order);
            params.onSuccess(order._id,order.Ordernum);
        }).catch((err)=> {
            console.error('------------- ERROR saving order (insert) -------------',err.name);
            params.onError();
        });
    }    

    // ===== updateOrder =====
    // ttOrder (array): order data
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public updateOrder (params) {
        console.log('net updateOrder',params.ttOrder);
        this.OrdersDS.save(params.ttOrder).then((result) => {
            console.log('SAVED ORDER - UPDATE',result);
            this.OrdersDS.clearSync();
            params.onSuccess();
        }).catch((err)=> {
            console.error('------------- ERROR saving order (update) -------------',err.name);
            this.OrdersDS.clearSync();
            params.onError();
        });
    }    

    // ===== removeOrder =====
    // Ordernum (string): order number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public removeOrder (params) {
        console.log('net removeOrder',params.Ordernum);
        const query = new Kinvey.Query;
        query.equalTo('Ordernum',Number(params.Ordernum));
        this.OrdersDS.remove(query)
        .then((result) => {
            console.log('DELETED ORDER',result);
            this.OrdersDS.clearSync();
            params.onSuccess();
        }).catch((err)=> {
            console.error('------------- ERROR removing order -------------',err.name);
            params.onError();
        });
    }    

    // ===== updateCustomer =====
    // ttCustomer (array): customer data
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public updateCustomer (params) {
        console.log('net updateCustomer',params.ttCustomer);
        this.CustomersDS.save(params.ttCustomer).then((result) => {
            console.log('SAVED CUSTOMER - UPDATE',result);
            this.CustomersDS.clearSync();
            params.onSuccess();
        }).catch((err)=> {
            console.error('------------- ERROR saving customer (update) -------------',err.name);
            this.CustomersDS.clearSync();
            params.onError();
        });
    }    

    // ===== addLine =====
    // Ordernum (string): order number
    // onSuccess (method): success callback method
    // onError (method): error callback method
    public addLine (params) {
        console.log('net addLine',params.CustNum);
        this.OrdersDS.save({
            Ordernum: Number(params.Ordernum)
        }
        ).then((line) => {
            console.log('SAVED ORDER LINE',line);
            params.onSuccess(line.Ordernum);
        }).catch((err)=> {
            console.error('------------- ERROR saving order line -------------',err.name);
            params.onError();
        });
    }    
}