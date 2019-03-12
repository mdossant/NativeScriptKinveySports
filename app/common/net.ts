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
    // onError (method, optional): error callback method
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
    public getCustomers (params) {
        console.log('net getCustomers');
        if (params.loadMoreItems)
            this.skip = this.skip + this.app.props.limit;
        else
            this.skip = 0;
        let skipFirstResults = false;
        let query = new Kinvey.Query;
        query.equalTo('SalesRep',this.userName);
        query.skip = this.skip;
        query.limit = this.app.props.limit;
        query.fields = ['CustNum','Name'];
        query.ascending(params.sortField);
        this.CustomersDS.find(query).subscribe(
            (customers) => {
                console.log('------------ RESULTS # -----------',customers.length);
                if (skipFirstResults)
                    params.onSuccess(customers);
                skipFirstResults = true;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------- ERROR fetching customers -------------',error.name);
                params.onError();
            }
        );
    }

    // ===== getCustomer =====
    // _id (string): customer entity id
    // onSuccess (method): success callback method
    public getCustomer (params) {
        console.log('net getCustomers',params._id);
        let skipFirstResults = false;
        this.CustomersDS.findById(params._id).subscribe(
            (customer) => {
                console.log('------------ CUSTOMER -----------',customer);
                if (skipFirstResults)
                    params.onSuccess(customer);
                skipFirstResults = true;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching customer --------------',error.name);
                params.onError();
            }
        );
    }

    // ===== getSalesRep =====
    // SalesRep (string): sales rep 3-letter acronym
    // onSuccess (method): success callback method
    public getSalesRep (params) {
        console.log('net getSalesRep',params.SalesRep);
        let skipFirstResults = false;
        let query = new Kinvey.Query;
        query.equalTo('SalesRep',params.SalesRep);
        query.fields = ['RepName'];
        this.SalesRepsDS.find(query).subscribe(
            (rep) => {
                console.log('------------ SALES REP -----------',rep);
                if (skipFirstResults)
                    params.onSuccess(rep[0].RepName);
                skipFirstResults = true;
            },
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching sales rep ------------',error.name);
                params.onError();
            }
        );
    }

    // ===== getOrders =====
    // CustNum (string): customer number
    // onSuccess (method): success callback method
    public getOrders (params) {
        console.log('net getOrders',params.CustNum);
        let skipFirstResults = false;
        let query = new Kinvey.Query;
        query.equalTo('CustNum',Number(params.CustNum));
        query.limit = this.app.props.limit;
        query.fields = ['Ordernum','OrderDate','OrderStatus'];
        query.ascending('OrderDate');
        this.OrdersDS.find(query).subscribe(
            (orders) => {
                console.log('------------ RESULTS # -----------',orders.length);
                if (skipFirstResults)
                    params.onSuccess(orders);
                skipFirstResults = true;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching orders -------------',error.name);
                params.onError();
            }
        );
    }

    // ===== getOrderLines =====
    // Ordernum (string): order number
    // onSuccess (method): success callback method
    public getOrderLines (params) {
        console.log('net getOrderLines',params.Ordernum);
        let skipFirstResults = false;
        let query = new Kinvey.Query;
        query.equalTo('Ordernum',Number(params.Ordernum));
        query.limit = this.app.props.limit;
        query.fields = ['Linenum','Itemnum','Price','Qty'];
        query.ascending('Linenum');
        this.OrderLinesDS.find(query).subscribe(
            (lines) => {
                console.log('------------ RESULTS # -----------',lines.length);
                if (skipFirstResults)
                    params.onSuccess(lines);
                skipFirstResults = true;
            }, 
            (error: Kinvey.BaseError) => {
                console.error('------------ ERROR fetching order lines -------------',error.name);
                params.onError();
            }
        );
    }

    // ===== getItem =====
    // Itemnum (string): item number
    // onSuccess (method): success callback method
    public getItem (params) {
        console.log('net getItem',params.Itemnum);
        let skipFirstResults = false;
        const query = new Kinvey.Query;
        query.equalTo('Itemnum',Number(params.Itemnum));
        this.ItemsDS.find(query).subscribe(
            (item) => {
                if (skipFirstResults)
                    params.onSuccess(item[0]);
                skipFirstResults = true;
            },
            (error: Kinvey.BaseError) => {
                console.error('------------- ERROR fetching item --------------',error.name);
                params.onError();
            }
        );
    }

    // ===== saveItem =====
    // itemData (string): item data
    // onSuccess (method): success callback method
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
    // _id (string): item entity id
    // onSuccess (method): success callback method
    public getItemImage (params) {
        console.log('net getItemImage',params._id);
        let skipFirstResults = false;
        this.ItemImagesDS.findById(params._id).subscribe(
            (itemImage) => {
                if (skipFirstResults)
                    params.onSuccess(itemImage.base64Image);
                skipFirstResults = true;
            },
            (error: Kinvey.BaseError) => {
                params.onSuccess();
            }
        );
    }

    // ===== saveItemImage =====
    // _id (string): item entity id
    // base64Image: base-64 encoded image data
    // onSuccess (method): success callback method
    public saveItemImage (params) {
        console.log('net saveItemImage');
        this.ItemImagesDS.save({
            _id: params._id,
            base64Image: params.base64Image
        }
        ).then((itemImage) => {
            console.log('SAVED ITEM IMAGE');
        }).catch((err)=> {
            console.error('------------- ERROR saving item image -------------',err.name);
        });
    }    
}