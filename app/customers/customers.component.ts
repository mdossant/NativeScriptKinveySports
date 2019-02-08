// app: sports
// class: customers
// purpose: download and show customers
// author: mauricio dos santos
// date: january 12 2019

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
    selector: 'ns-customers',
    moduleId: module.id,
    templateUrl: './customers.component.html',
})

export class CustomersComponent implements OnInit {

    private loading: Boolean;
    private ballState: Boolean;
    private title: String;
    private RepName: String;
    private exitIcon: String = String.fromCharCode(0xea14);
    private sortIcon: String = String.fromCharCode(0xea48);
    private dsCustomer: Array<any> = [];
    private sortByName: Boolean = false;

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('customers ngOnInit');
        this.loading = true;
        this.RepName = this.screen.snapshot.params['RepName'];
        this.title = 'Loading customers...';
        setTimeout(()=>this.getCustomers(false),50);
    }

    animateBall(target: View) {
        console.log('customers animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateBall(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateBall(target)})
    }

    private getCustomers (loadMoreItems) {
        console.log('customers getCustomers');
        this.net.getCustomers({
            loadMoreItems: loadMoreItems,
            sortField: (this.sortByName) ? 'Name' : 'CustNum',
            onSuccess: (dsCustomer) => this.showCustomers(dsCustomer),
            onError: () => {
                this.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Customers',
                    message: 'Ensure your have a strong network signal and sign in again.',
                    okButtonText: 'OK'
                }).then(()=>this.signOut());
            }
        });
    }

    private showCustomers (dsCustomer) {
        console.log('customers showCustomers',dsCustomer.length);
        this.title = this.RepName;
        for (let i=0; i<dsCustomer.length; i++)
           this.dsCustomer.push(dsCustomer[i]);
        this.loading = false;
    }

    private loadMoreItems () {
        console.log('customers loadMoreItems');
        this.getCustomers(true);
    }

    private changeSort () {
        console.log('customers changeSort');
        this.sortByName = !this.sortByName;
        this.dsCustomer = [];
        this.getCustomers(false);

    }

    private showCustomer (e) {
        console.log('customers showCustomer',e.index);
        this.router.navigate(['/customer',this.RepName,this.dsCustomer[e.index]._id],{clearHistory:true,transition:{name:'fade'}});
    }

    private showOrders (e) {
        console.log('customers showOrders',e.index);
        this.router.navigate(['/orders',this.RepName,this.dsCustomer[e.index].CustNum,this.dsCustomer[e.index].Name],{clearHistory:true,transition:{name:'fade'}});
    }

    private signOut () {
        console.log('customers signOut');
        this.router.navigate(['/'],{clearHistory:true,transition:{name:'fade'}});
    }
}