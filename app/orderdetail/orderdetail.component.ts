// app: Sports
// class: orderdetail
// purpose: download and show order detail
// author: mauricio dos santos
// date: january 16 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page, View } from 'tns-core-modules/ui/page';
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
    private leftIcon: View;
    private rightIcon: View;
    private RepName: String;
    private CustNum: String;
    private Ordernum: String;
    private Name: String;
    private ttOrderLine = {};
    private selectedTab: Number = 0;
    private customerData = [];
    private orderData = [];

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orderdetail ngOnInit');
        this.app.loading = true;
        this.title = 'Loading order detail...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        this.leftIcon = <View>this.page.getViewById('leftIcon');
        this.rightIcon = <View>this.page.getViewById('rightIcon');
        setTimeout(() => this.getOrderDetail(),50);
    }

    private getOrderDetail () {
        console.log('orderdetail getOrderDetail',this.Ordernum);
        this.net.getOrderDetail({
            Ordernum: this.Ordernum,
            onSuccess: (dsOrderDetail) => this.showOrderDetail(dsOrderDetail)
        })
    }

    private showOrderDetail (dsOrderDetail) {
        console.log('orderdetail showOrderDetail lines#',dsOrderDetail.ttOrderLine.length);
        this.ttOrderLine = dsOrderDetail.ttOrderLine;
        this.title = 'Order# ' + this.Ordernum;
        const ttCustomer = dsOrderDetail.ttCustomer[0];
        for (let k in ttCustomer) this.customerData.push({columnLabel: k, columnValue: ttCustomer[k]});
        const ttOrderDetail = dsOrderDetail.ttOrderDetail[0];
        for (let k in ttOrderDetail) this.orderData.push({columnLabel: k, columnValue: ttOrderDetail[k]});
        this.app.loading = false;
    }

    private showItem (e) {
        console.log('orderdetail showItem',e.index);
        this.router.navigate(['/item',this.RepName,this.CustNum,this.Name,this.Ordernum,this.ttOrderLine[e.index].Itemnum],{clearHistory:true,transition:{name:'fade'}});
    }

    private showOrders () {
        console.log('orderdetail showOrder');
        this.app.animateIcon({
            target: this.leftIcon,
            onSuccess: () => {
                this.router.navigate(['/orders',this.RepName,this.CustNum,this.Name],{clearHistory:true,transition:{name:'fade'}});
            }
        });
    }

    private addLine () {
        console.log('orderdetail addLine');
        this.app.animateIcon({
            target: this.rightIcon,
            onSuccess: () => {
                console.log('will add line -- TBD');
            }
        });
    }

    private selectTab (tabNumber) {
        console.log('orderdetail selectTab',tabNumber);
        this.selectedTab = tabNumber;
    }
}