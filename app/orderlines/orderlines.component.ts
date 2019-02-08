// app: sports
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
    selector: 'ns-orderlines',
    moduleId: module.id,
    templateUrl: './orderlines.component.html',
})

export class OrderLinesComponent implements OnInit {

    private loading: Boolean;
    private ballState: Boolean;
    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private RepName: String;
    private CustNum: String;
    private Ordernum: String;
    private Name: String;
    private dsOrderLine = {};

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orderlines ngOnInit');
        this.loading = true;
        this.title = 'Loading order lines...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        setTimeout(()=>this.getOrderLines(),50);
    }

    animateBall(target: View) {
        console.log('orderlines animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateBall(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateBall(target)})
    }

    private getOrderLines () {
        console.log('orderlines getOrderLines',this.Ordernum);
        this.net.getOrderLines({
            Ordernum: this.Ordernum,
            onSuccess: (dsOrderLine) => this.showOrderLines(dsOrderLine)
        })
    }

    private showOrderLines (dsOrderLine) {
        console.log('orderlines showOrderLines',dsOrderLine.length);
        this.dsOrderLine = dsOrderLine;
        this.title = 'Order# ' + this.Ordernum;
        this.loading = false;
    }

    private showItem (e) {
        console.log('orderlines showItem',e.index);
        this.router.navigate(['/item',this.RepName,this.CustNum,this.Name,this.Ordernum,this.dsOrderLine[e.index].Itemnum],{clearHistory:true,transition:{name:'fade'}});
    }

    private showOrders () {
        console.log('orderlines showOrder');
        this.router.navigate(['/orders',this.RepName,this.CustNum,this.Name],{clearHistory:true,transition:{name:'fade'}});
    }
}