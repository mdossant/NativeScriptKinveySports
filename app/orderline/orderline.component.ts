// app: Sports
// class: orderline
// purpose: download and show/edit order line
// author: mauricio dos santos
// date: march 25 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ListView } from 'tns-core-modules/ui/list-view';
import { Page, View } from 'tns-core-modules/ui/page';
import * as dialog from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'ns-orderline',
    moduleId: module.id,
    templateUrl: './orderline.component.html',
})

export class OrderLineComponent implements OnInit {

    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private leftIcon: View;
    private _id: String;
    private RepName: String;
    private CustNum: String;
    private Ordernum: String;    
    private Linenum: String;
    private Name: String;
    private ttOrderLine = {};
    private lineData = [];
    private lineDataList: ListView;
    private index: Number;
    private currencyFormatter: Intl.NumberFormat;

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('orderline ngOnInit');
        this.app.loading = true;
        this.title = 'Loading order line...';
        this._id = this.screen.snapshot.params['_id'];
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        this.Linenum = this.screen.snapshot.params['Linenum'];
        this.leftIcon = <View>this.page.getViewById('leftIcon');
        this.lineDataList = <ListView>this.page.getViewById('lineDataList');
        this.currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        setTimeout(() => this.getOrderLine(),50);
    }

    private getOrderLine () {
        console.log('orderline getOrderLine',this.Ordernum,this.Linenum);
        this.net.getOrderLine({
            Ordernum: this.Ordernum,
            Linenum: this.Linenum,
            onSuccess: (ttOrderLine) => this.showOrderLine(ttOrderLine),
            onError: () => {
                this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Order Line',
                    message: 'Ensure your have a strong network signal and try again.',
                    okButtonText: 'OK'
                }).then(()=>this.showOrderDetail());
            }
        })
    }

    private getColumnLabel (name) {
        console.log('orderline getColumnLabel');
        let label = '';
        for (let i=0; i<name.length; i++) {
            if (i > 0 && name.charCodeAt(i) > 64 && name.charCodeAt(i) < 91) // uppercase letter?
                label = label + ' ';
            label = label + name.charAt(i);
        }
        return label;
    }

    private formatColumnValue (name,value) {
        console.log('orderline formatColumnValue');
        if (name.indexOf('Price') > -1)
            value = this.currencyFormatter.format(value);
        return value;
    }

    private setListData () {
        console.log('orderline setListData');
        this.lineData = [];
        for (let k in this.ttOrderLine)
            if (k.indexOf('seq') === -1 && k.indexOf('Ordernum') === -1 && k.indexOf('Linenum') === -1 && k.indexOf('id') === -1)
                this.lineData.push({columnName: k, columnLabel: this.getColumnLabel(k), columnValue: this.formatColumnValue(k,this.ttOrderLine[k])});
        // trick: add some keyboard buffer area
        for (let i=0; i<6; i++)
            this.lineData.push({});
    }

    private showOrderLine (ttOrderLine) {
        console.log('orderline showOrderLine',ttOrderLine);
        this.ttOrderLine = ttOrderLine;
        this.ttOrderLine['_id'] = this._id;
        this.title = 'Line# ' + this.Linenum;
        this.setListData();
        this.app.loading = false;
    }

    private showItem (e) {
        console.log('orderline showItem',e.index);
        this.router.navigate(['/item',this._id,this.RepName,this.CustNum,this.Name,this.Ordernum,this.ttOrderLine[e.index].Itemnum],{clearHistory:true,transition:{name:'fade'}});
    }

    private showOrderDetail () {
        console.log('orderline showOrderDetail');
        this.app.animateIcon({
            target: this.leftIcon,
            onSuccess: () => {
                this.router.navigate(['/orderdetail',this._id,this.RepName,this.CustNum,this.Name,this.Ordernum,2],{clearHistory:true,transition:{name:'fade'}});
            }
        });
    }

    private editLine (index) {
        console.log('orderline editLine',index);
        console.log(this.lineData[index]);
        console.log(this.ttOrderLine[this.lineData[index].columnName]);
        this.lineDataList.scrollToIndexAnimated(index);
    }

    private calculateExtPrice() {
        console.log('orderline calculateExtPrice');
        this.ttOrderLine['ExtendedPrice'] = this.ttOrderLine['Price'] * this.ttOrderLine['Qty'] * (100 - this.ttOrderLine['Discount']) / 100;
    }

    private updateLine (index,newValue) {
        console.log('orderline updateLine',index,newValue);
        const name = this.lineData[index].columnName;
        let currentValue = this.ttOrderLine[name];
        if (name.indexOf('Price') > -1) {
            currentValue = Number(currentValue);
            newValue = Number(newValue.replace('$',''));
        }
        console.log(currentValue,newValue);
        if (currentValue !== newValue) {
            this.ttOrderLine[this.lineData[index].columnName] = newValue;
            this.calculateExtPrice();
            this.setListData();
            this.net.updateOrderLine({
                ttOrderLine: this.ttOrderLine,
                onSuccess: () => {console.log('orderline updateLine SUCCESS')},
                onError: () => {
                    console.log('orderline updateLine ERROR?');
                    /*
                    this.app.loading = false;
                    dialog.confirm({
                        title: 'Could Not Update Order Line',
                        message: 'Ensure your have a strong network signal and try again.',
                        okButtonText: 'OK'
                    });
                    */
                }
            });
        }
    }

    private confirmRemoveLine () {
        console.log('orderline confirmRemoveLine');
        dialog.confirm('Are you sure you want to remove this order line?')
        .then((reply)=>{
            if (reply) this.removeLine();
        })
    }
    private removeLine () {
        console.log('orderline removeLine');
        this.net.removeOrderLine({
            Ordernum: this.Ordernum,
            Linenum: this.Linenum,
            onSuccess: () => this.showOrderDetail(),
            onError: () => {
                this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Remove Order Line',
                    message: 'Ensure your have a strong network signal and try again.',
                    okButtonText: 'OK'
                });
            }
        });
    }
}