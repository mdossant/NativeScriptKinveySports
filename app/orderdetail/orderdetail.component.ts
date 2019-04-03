// app: Sports
// class: orderdetail
// purpose: download and show/edit order detail
// author: mauricio dos santos
// date: january 16 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ListView } from 'tns-core-modules/ui/list-view';
import { Page, View, Color } from 'tns-core-modules/ui/page';
import { DatePicker } from 'tns-core-modules/ui/date-picker';
import * as dialog from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'ns-orderdetail',
    moduleId: module.id,
    templateUrl: './orderdetail.component.html',
})

export class OrderDetailComponent implements OnInit {

    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private plusIcon: String = String.fromCharCode(0xea0a) + 'L';
    private cancelIcon: String = String.fromCharCode(0xea0d);
    private doneIcon: String = String.fromCharCode(0xea10);
    private leftIcon: View;
    private rightIcon: View;
    private enabledButtonColor: Color = new Color('white');
    private disabledButtonColor: Color = new Color('rgb(190,190,190)');
    private _id: String;
    private RepName: String;
    private CustNum: String;
    private Ordernum: String;
    private Name: String;
    private ttOrderLine = {};
    private ttOrderDetail = {};
    private ttCustomer = {};
    private selectedTab: Number = 0;
    private customerData = [];
    private orderData = [];
    private orderDataList: ListView;
    private customerDataList: ListView;
    private showingDatePicker: Boolean = false;
    private editColumn: String;
    private addingOrderLine: Boolean = false;
    private index: Number;
    private datePicker: DatePicker;
    private dateFormatter: Intl.DateTimeFormat;
    private currencyFormatter: Intl.NumberFormat;

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orderdetail ngOnInit');
        this.app.loading = true;
        this.title = 'Loading order detail...';
        this._id = this.screen.snapshot.params['_id'];
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        this.selectedTab = Number(this.screen.snapshot.params['tab']);
        this.leftIcon = <View>this.page.getViewById('leftIcon');
        this.rightIcon = <View>this.page.getViewById('rightIcon');
        this.orderDataList = <ListView>this.page.getViewById('orderDataList');
        this.customerDataList = <ListView>this.page.getViewById('customerDataList');
        this.datePicker = <DatePicker>this.page.getViewById('datePicker');
        this.dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
        this.currencyFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
        setTimeout(() => this.getOrderDetail(),50);
    }

    private getOrderDetail () {
        console.log('orderdetail getOrderDetail',this.Ordernum);
        this.net.getOrderDetail({
            Ordernum: this.Ordernum,
            onSuccess: (dsOrderDetail) => this.showOrderDetail(dsOrderDetail),
            onError: () => {
                this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Order Detail',
                    message: 'Ensure your have a strong network signal and try again.',
                    okButtonText: 'OK'
                }).then(()=>this.showOrders());
            }
        })
    }

    private formatDate (value) {
        console.log('orderDetail formatDate');
        const date = new Date(value);
        return this.dateFormatter.format(date);
    }

    private getColumnLabel (name) {
        console.log('orderdetail getColumnLabel');
        let label = '';
        for (let i=0; i<name.length; i++) {
            if (i > 0 && name.charCodeAt(i) > 64 && name.charCodeAt(i) < 91) // uppercase letter?
                label = label + ' ';
            label = label + name.charAt(i);
        }
        return label;
    }

    private formatColumnValue (name,value) {
        console.log('orderdetail formatColumnValue');
        if (name.indexOf('Balance') > -1 || name.indexOf('CreditLimit') > -1)
            value = this.currencyFormatter.format(value);
        return value;
    }

    private setListData () {
        console.log('orderdetail setListData');
        this.orderData = [];
        this.customerData = [];
        for (let k in this.ttOrderDetail)
            if (k.indexOf('SalesRep') === -1 && k.indexOf('_id') === -1)
                if (k.indexOf('Date')>-1 && this.ttOrderDetail[k])
                    this.orderData.push({
                        columnName: k,
                        columnLabel: this.getColumnLabel(k),
                        columnValue: this.formatDate(this.ttOrderDetail[k]),
                        editable: k!=='Ordernum'&&k!=='CustNum'&&k!=='ExtendedPrice',
                        showDatePicker: true
                    });
                else
                    this.orderData.push({
                        columnName: k,
                        columnLabel: this.getColumnLabel(k),
                        columnValue: this.ttOrderDetail[k],
                        editable: k!=='Ordernum'&&k!=='CustNum'&&k!=='ExtendedPrice',
                        showDatePicker: false
                    });
        for (let k in this.ttCustomer)
            if (k.indexOf('SalesRep') === -1 && k.indexOf('_id') === -1)
                this.customerData.push({
                    columnName: k,
                    columnLabel: this.getColumnLabel(k),
                    columnValue: this.formatColumnValue(k,this.ttCustomer[k]),
                    editable: k!=='CustNum'
                });
        // trick: add some keyboard buffer area
        for (let i=0; i<6; i++) {
            this.orderData.push({});
            this.customerData.push({});
        }
    }

    private showOrderDetail (dsOrderDetail) {
        console.log('orderdetail showOrderDetail',dsOrderDetail);
        if (dsOrderDetail.ttOrderLine)
            this.ttOrderLine = dsOrderDetail.ttOrderLine;
        else
            this.ttOrderLine = [];
        this.title = 'Order# ' + this.Ordernum;
        this.ttOrderDetail = dsOrderDetail.ttOrderDetail[0];
        this.ttOrderDetail['_id'] = this._id;
        this.ttCustomer = dsOrderDetail.ttCustomer[0];
        this.ttCustomer['_id'] = this._id;
        this.setListData();
        this.app.loading = false;
    }

    private showLine (e) {
        console.log('orderdetail showLine',e.index);
        if (this.addingOrderLine)
            return;
        this.router.navigate(['/orderline',this._id,this.RepName,this.CustNum,this.Name,this.Ordernum,this.ttOrderLine[e.index].Linenum],{clearHistory:true,transition:{name:'fade'}});
    }

    private showOrders () {
        console.log('orderdetail showOrders');
        if (this.addingOrderLine)
            return;
        this.app.animateIcon({
            target: this.leftIcon,
            onSuccess: () => {
                this.router.navigate(['/orders',this.RepName,this.CustNum,this.Name],{clearHistory:true,transition:{name:'fade'}});
            }
        });
    }

    private editOrder (index) {
        console.log('orderdetail editOrder',index);
        console.log(this.orderData[index]);
        console.log(this.ttOrderDetail[this.orderData[index].columnName]);
        this.orderDataList.scrollToIndexAnimated(index);
    }

    private editDate (index) {
        console.log('orderdetail editDate',index);
        console.log(this.ttOrderDetail[this.orderData[index].columnName]);
        this.index = index;
        let columnDate;
        if (this.ttOrderDetail[this.orderData[index].columnName])
            columnDate = new Date(this.ttOrderDetail[this.orderData[index].columnName]);
        else
            columnDate = new Date();
        this.editColumn = this.orderData[index].columnLabel;
        this.datePicker.month = columnDate.getMonth() + 1;
        this.datePicker.day = columnDate.getDate();
        this.datePicker.year = columnDate.getFullYear();
        this.showingDatePicker = true;
    }

    private cancelEditDate () {
        console.log('orderdetail cancelEditDate');
        this.showingDatePicker = false;
    }

    private doneEditDate () {
        console.log('orderdetail doneEditDate',this.datePicker.date);
        this.updateOrder(this.index,this.datePicker.date);
        this.showingDatePicker = false;
    }

    private updateOrder (index,newValue) {
        console.log('orderdetail updateOrder',index,newValue);
        const name = this.orderData[index].columnName;
        let currentValue = this.ttOrderDetail[name];
        console.log(currentValue,newValue);
        if (currentValue !== newValue) {
            this.ttOrderDetail[this.orderData[index].columnName] = newValue;
            this.setListData();
            this.net.updateOrder({
                ttOrder: this.ttOrderDetail,
                onSuccess: () => {console.log('orderdetail updateOrder SUCCESS')},
                onError: () => {
                    console.log('orderdetail updateOrder ERROR?');
                    /*
                    this.app.loading = false;
                    dialog.confirm({
                        title: 'Could Not Update Order',
                        message: 'Ensure your have a strong network signal and try again.',
                        okButtonText: 'OK'
                    });
                    */
                }
            });
        }
    }

    private editCustomer (e) {
        console.log('orderdetail editCustomer',e.index);
        console.log(this.customerData[e.index]);
        console.log(this.ttCustomer[this.customerData[e.index].columnName]);
        this.customerDataList.scrollToIndexAnimated(e.index);
    }

    private updateCustomer (index,newValue) {
        console.log('orderdetail updateCustomer',index,newValue);
        const name = this.customerData[index].columnName;
        let currentValue = this.ttCustomer[name];
        if (name.indexOf('Balance') > -1 || name.indexOf('CreditLimit') > -1) {
            currentValue = Number(currentValue);
            newValue = Number(newValue.replace('$',''));
        }
        console.log(currentValue,newValue);
        if (currentValue !== newValue) {
            this.ttCustomer[this.customerData[index].columnName] = newValue;
            this.setListData();
            this.net.updateCustomer({
                ttCustomer: this.ttCustomer,
                onSuccess: () => {console.log('orderdetail updateCustomer SUCCESS')},
                onError: () => {
                    console.log('orderdetail updateCustomer ERROR');
                    /*
                    this.app.loading = false;
                    dialog.confirm({
                        title: 'Could Not Update Order',
                        message: 'Ensure your have a strong network signal and try again.',
                        okButtonText: 'OK'
                    });
                    */
                }
            });
        }
    }

    private addOrderLine () {
        console.log('orderdetail addOrderLine');
        if (this.addingOrderLine)
            return;
        this.app.animateIcon({
            target: this.rightIcon,
            onSuccess: () => {
                console.log('will add order line now');
                this.addingOrderLine = true;
                this.leftIcon.color = this.disabledButtonColor;
                this.rightIcon.color = this.disabledButtonColor;
                this.title = 'Adding order line...';
                this.net.addOrderLine({
                    Ordernum: this.Ordernum,
                    onSuccess: (_id,Linenum) => {
                        this.router.navigate(['/orderline',_id,this.RepName,this.CustNum,this.Name,this.Ordernum,Linenum],{clearHistory:true,transition:{name:'fade'}});
                    },
                    onError: () => {
                        dialog.confirm({
                            title: 'Could Not Add Order Line',
                            message: 'Ensure your have a strong network signal and try again.',
                            okButtonText: 'OK'
                        }).then(() => {
                            this.addingOrderLine = false;
                            this.leftIcon.color = this.enabledButtonColor;
                            this.rightIcon.color = this.enabledButtonColor;
                            this.title = this.Name;
                        })
                    }
                });
            }
        });
    }

    private confirmRemoveOrder () {
        console.log('orderdetail confirmRemoveOrder');
        if (this.addingOrderLine)
            return;
        dialog.confirm('Are you sure you want to remove this order and all of its order lines?')
        .then((reply)=>{
            if (reply) this.removeOrder();
        })
    }
    private removeOrder () {
        console.log('orderdetail removeOrder');
        this.net.removeOrder({
            Ordernum: this.Ordernum,
            onSuccess: () => this.showOrders(),
            onError: () => {
                this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Remove Order',
                    message: 'Ensure your have a strong network signal and try again.',
                    okButtonText: 'OK'
                });
            }
        });
    }

    private selectTab (tabNumber) {
        console.log('orderdetail selectTab',tabNumber);
        if (this.addingOrderLine)
            return;
        if (tabNumber === 0) this.orderDataList.scrollToIndexAnimated(0);
        if (tabNumber === 1) this.customerDataList.scrollToIndexAnimated(0);
        this.selectedTab = tabNumber;
        this.showingDatePicker = false;
    }
}