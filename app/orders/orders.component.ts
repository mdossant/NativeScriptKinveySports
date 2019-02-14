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
import { View } from 'tns-core-modules/ui/core/view';
import {AnimationCurve} from 'tns-core-modules/ui/enums';
import * as dialog from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'ns-orders',
    moduleId: module.id,
    templateUrl: './orders.component.html',
})

export class OrdersComponent implements OnInit {

    private loading: Boolean;
    private ballState: Boolean;
    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private RepName: String;
    private CustNum: String;
    private Name: String;
    private dsOrder = {};

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orders ngOnInit');
        this.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        setTimeout(()=>this.getOrders(),50);
    }

    animateBall(target: View) {
        console.log('orders animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateBall(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateBall(target)})
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
        this.loading = false;
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