// app: Sports
// class: orders
// purpose: download and show orders
// author: mauricio dos santos
// date: january 16 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import * as dialog from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'ns-orders',
    moduleId: module.id,
    templateUrl: './orders.component.html',
})

export class OrdersComponent implements OnInit {

    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private RepName: String;
    private CustNum: String;
    private Name: String;
    private dsOrder = {};

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orders ngOnInit');
        this.app.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        setTimeout(()=>this.getOrders(),50);
    }

    private getOrders () {
        console.log('orders getOrders',this.CustNum);
        this.net.getOrders({
            CustNum: this.CustNum,
            onSuccess: (dsOrder) => this.showOrders(dsOrder)
        })
    }

    private showOrders (dsOrder) {
        console.log('orders showOrders',dsOrder.length);
        this.dsOrder = dsOrder;
        this.title = this.Name;
        this.app.loading = false;
    }

    private showOrderLines (e) {
        console.log('orders showOrderLines',e.index);
        this.router.navigate(['/orderlines',this.RepName,this.CustNum,this.Name,this.dsOrder[e.index].Ordernum],{clearHistory:true,transition:{name:'fade'}});
    }

    private showCustomers () {
        console.log('orders showCustomers');
        this.router.navigate(['/customers',this.RepName],{clearHistory:true,transition:{name:'fade'}});
    }
}