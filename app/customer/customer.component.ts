// app: Sports
// class: customer
// purpose: download and show customer
// author: mauricio dos santos
// date: january 15 2019

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
    selector: 'ns-customer',
    moduleId: module.id,
    templateUrl: './customer.component.html',
})

export class CustomerComponent implements OnInit {

    private loading: Boolean;
    private ballState: Boolean;
    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private RepName: String;
    private _id: String;
    private dsCustomer = {};
    private dsOrder = {};

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('customer ngOnInit');
        this.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this._id = this.screen.snapshot.params['_id'];
        setTimeout(()=>this.getCustomer(),50);
    }

    animateBall(target: View) {
        console.log('customer animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateBall(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateBall(target)})
    }

    private getCustomer () {
        console.log('customer getCustomer');
        this.net.getCustomer({
            _id: this._id,
            onSuccess: (dsCustomer) => this.showCustomer(dsCustomer),
            onError: () => {
                this.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Customer',
                    message: 'Ensure your have a strong network signal and sign in again.',
                    okButtonText: 'OK'
                }).then(()=>this.showCustomers());
            }
        });
    }

    private showCustomer (dsCustomer) {
        console.log('customer showCustomer',dsCustomer);
        this.dsCustomer = dsCustomer;
        this.title = dsCustomer.Name;
        this.getOrders(dsCustomer.CustNum);
    }

    private getOrders (CustNum) {
        console.log('customer getOrders',CustNum);
        this.net.getOrders({
            CustNum: CustNum,
            onSuccess: (dsOrder) => this.showOrders(dsOrder)
        })
    }

    private showOrders (dsOrder) {
        console.log('customer showOrders',dsOrder.length);
        this.dsOrder = dsOrder;
        this.loading = false;
    }

    private showOrder (e) {
        console.log('customer showOrder',e.index);
//        this.router.navigate(['/order'],{clearHistory:true,transition:{name:'fade'}});
    }

    private showCustomers () {
        console.log('customer showCustomers');
        this.router.navigate(['/customers',this.RepName],{clearHistory:true,transition:{name:'fade'}});
    }
}