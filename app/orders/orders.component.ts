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
import { Page, View, Color, isAndroid } from 'tns-core-modules/ui/page';
import * as dialog from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'ns-orders',
    moduleId: module.id,
    templateUrl: './orders.component.html',
})

export class OrdersComponent implements OnInit {

    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private plusIcon: String = String.fromCharCode(0xea0a);
    private leftIcon: View;
    private rightIcon: View;
    private enabledButtonColor: Color = new Color('white');
    private disabledButtonColor: Color = new Color('rgb(190,190,190)');
    private RepName: String;
    private CustNum: String;
    private Name: String;
    private dsOrder = {};
    private addingOrder: Boolean = false;
    private dateFormatter: Intl.DateTimeFormat;

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orders ngOnInit');
        this.app.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.leftIcon = <View>this.page.getViewById('leftIcon');
        this.rightIcon = <View>this.page.getViewById('rightIcon');
        this.dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
        setTimeout(()=>this.getOrders(),50);
    }

    private getOrders () {
        console.log('orders getOrders',this.CustNum);
        this.net.getOrders({
            CustNum: this.CustNum,
            onSuccess: (dsOrder) => this.showOrders(dsOrder),
            onError: () => {
                this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Orders',
                    message: 'Ensure your have a strong network signal and try again.',
                    okButtonText: 'OK'
                }).then(()=>this.showCustomers());
            }
        })
    }

    private showOrders (dsOrder) {
        console.log('orders showOrders',dsOrder.length);
        this.dsOrder = dsOrder;
        for (var i=0; i<dsOrder.length; i++) {
            const date = new Date(dsOrder[i].OrderDate);
            dsOrder[i].OrderDate = this.dateFormatter.format(date);
        }
        this.title = 'Customer\'s Orders';
        if (isAndroid) this.title = '< ' + this.title;
        this.app.loading = false;
    }

    private showOrderDetail (e) {
        console.log('orders showOrderDetail',e.index);
        if (this.addingOrder)
            return;
        this.router.navigate(['/orderdetail',this.dsOrder[e.index]._id,this.RepName,this.CustNum,this.Name,this.dsOrder[e.index].Ordernum,0],{clearHistory:true,transition:{name:'fade'}});
    }

    private showCustomers () {
        console.log('orders showCustomers');
        if (this.addingOrder)
            return;
        this.app.animateIcon({
            target: this.leftIcon,
            onSuccess: () => {
                this.router.navigate(['/customers',this.RepName],{clearHistory:true,transition:{name:'fade'}});
            }
        });
    }

    private addOrder () {
        console.log('order addOrder');
        if (this.addingOrder)
            return;
        this.app.animateIcon({
            target: this.rightIcon,
            onSuccess: () => {
                console.log('will add order now');
                this.addingOrder = true;
                this.leftIcon.color = this.disabledButtonColor;
                this.rightIcon.color = this.disabledButtonColor;
                this.title = 'Adding order...';
                this.net.addOrder({
                    CustNum: this.CustNum,
                    onSuccess: (_id,Ordernum) => {
                        this.router.navigate(['/orderdetail',_id,this.RepName,this.CustNum,this.Name,Ordernum,0],{clearHistory:true,transition:{name:'fade'}});
                    },
                    onError: () => {
                        dialog.confirm({
                            title: 'Could Not Add Order',
                            message: 'Ensure your have a strong network signal and try again.',
                            okButtonText: 'OK'
                        }).then(() => {
                            this.addingOrder = false;
                            this.leftIcon.color = this.enabledButtonColor;
                            this.rightIcon.color = this.enabledButtonColor;
                            this.title = this.Name;
                        })
                    }
                });
            }
        });
    }
}