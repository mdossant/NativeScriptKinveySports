// app: Sports
// class: item
// purpose: download and show item
// author: mauricio dos santos
// date: january 20 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page, View, isAndroid } from 'tns-core-modules/ui/page';
import { Image } from 'tns-core-modules/ui/image';
import { ImageSource } from 'tns-core-modules/image-source';
import * as dialog from 'tns-core-modules/ui/dialogs';
import * as camera from 'nativescript-camera';

@Component({
    selector: 'ns-item',
    moduleId: module.id,
    templateUrl: './item.component.html',
})

export class ItemComponent implements OnInit {

    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private cameraIcon: String = String.fromCharCode(0xe90f);
    private leftIcon: View;
    private rightIcon: View;
    private _id: String;
    private RepName: String;
    private CustNum: String;
    private Ordernum: String;
    private Linenum: String;
    private Itemnum: String;
    private Name: String;
    private itemImage: Image;
    private dsItem = {};
    private itemData = [];
    private amountFormatter: Intl.NumberFormat;
    private currencyFormatter: Intl.NumberFormat;

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('item ngOnInit');
        this.app.loading = true;
        this.title = 'Loading item...';
        this._id = this.screen.snapshot.params['_id'];
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        this.Linenum = this.screen.snapshot.params['Linenum'];
        this.Itemnum = this.screen.snapshot.params['Itemnum'];
        this.itemImage = <Image>this.page.getViewById('itemImage');
        this.leftIcon = <View>this.page.getViewById('leftIcon');
        this.rightIcon = <View>this.page.getViewById('rightIcon');
        this.amountFormatter = new Intl.NumberFormat('en-US', {style: 'amount', maximumFractionDigits: 0});
        this.currencyFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
        setTimeout(()=>this.getItem(),50);
    }

    private getItem () {
        console.log('item getItem');
        this.net.getItem({
            Itemnum: this.Itemnum,
            onSuccess: (dsItem) => {
                this.net.getItemImage({
                    Itemnum: this.Itemnum,
                    onSuccess: (dsItemImage) => {
                        dsItem.itemImage_id = dsItemImage._id;
                        dsItem.base64Image = dsItemImage.base64Image;
                        this.showItem(dsItem);
                    }
                });
            },
            onError: () => {
                this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Item',
                    message: 'Ensure your have a strong network signal and try again.',
                    okButtonText: 'OK'
                }).then(()=>this.showOrderLine());
            }
        });
    }

    private showItem (dsItem) {
        console.log('item showItem');        
        this.title = 'Item Master';
        if (isAndroid) this.title = '< ' + this.title;
        this.dsItem = dsItem;
        this.itemData.push({columnLabel: 'Item#',       columnValue: this.Itemnum});
        this.itemData.push({columnLabel: 'Name',        columnValue: dsItem.ItemName});
        this.itemData.push({columnLabel: 'Category',    columnValue: dsItem.Category2});
        this.itemData.push({columnLabel: 'Subcategory', columnValue: dsItem.Category1});
        this.itemData.push({columnLabel: 'On Hand',     columnValue: this.amountFormatter.format(dsItem.Onhand)});
        this.itemData.push({columnLabel: 'Allocated',   columnValue: this.amountFormatter.format(dsItem.Allocated)});
        this.itemData.push({columnLabel: 'Available',   columnValue: this.amountFormatter.format(dsItem.Onhand - dsItem.Allocated)});
        this.itemData.push({columnLabel: 'Price',       columnValue: this.currencyFormatter.format(dsItem.Price)});
        if (dsItem.base64Image) {
            let imgSrc = new ImageSource();
            imgSrc.fromBase64(dsItem.base64Image).then(() => this.itemImage.src = imgSrc);
        }
        this.app.loading = false;
    }

    private takePicture () {
        console.log('item takePicture',camera.isAvailable());
        this.app.animateIcon({
            target: this.rightIcon,
            onSuccess: () => {
                if (!camera.isAvailable()) {
                    dialog.alert('Camera is not available in simulator.');
                    return;
                }
                camera.takePicture({keepAspectRatio:true,width:120}).then((imageAsset) => {
                    let imgSrc = new ImageSource();
                    imgSrc.fromAsset(imageAsset).then((img)=>{
                        const base64Image = img.toBase64String("jpg",60);
                        this.itemImage.src = img;
                        this.net.saveItemImage({
                            _id: this.dsItem['itemImage_id'],
                            Itemnum: this.Itemnum,
                            base64Image: base64Image
                        })
                    });
                });
            }
        });
    }

    private showOrderLine () {
        console.log('item showOrderLine');
        this.app.animateIcon({
            target: this.leftIcon,
            onSuccess: () => {
                this.router.navigate(['/orderline',this._id,this.RepName,this.CustNum,this.Name,this.Ordernum,this.Linenum],{clearHistory:true,transition:{name:'fade'}});
            }
        });
    }
}