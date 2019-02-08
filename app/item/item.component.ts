// app: sports
// class: item
// purpose: download and show item
// author: mauricio dos santos
// date: january 20 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { View } from 'tns-core-modules/ui/core/view';
import { Image } from 'tns-core-modules/ui/image';
import { ImageSource } from 'tns-core-modules/image-source';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import * as dialog from 'tns-core-modules/ui/dialogs';
import * as camera from 'nativescript-camera';

@Component({
    selector: 'ns-item',
    moduleId: module.id,
    templateUrl: './item.component.html',
})

export class ItemComponent implements OnInit {

    private loading: Boolean;
    private ballState: Boolean;
    private title: String;
    private backIcon: String = String.fromCharCode(0xea40);
    private cameraIcon: String = String.fromCharCode(0xe90f);
    private RepName: String;
    private CustNum: String;
    private Ordernum: String;
    private Itemnum: String;
    private Name: String;
    private itemImage: Image;
    private dsItem = {};
    private itemData = [];

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions, private screen: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('item ngOnInit');
        this.loading = true;
        this.title = 'Loading item...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        this.Itemnum = this.screen.snapshot.params['Itemnum'];
        this.itemImage = <Image>this.page.getViewById('itemImage');
        setTimeout(()=>this.getItem(),50);
    }

    animateBall(target: View) {
        console.log('item animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateBall(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateBall(target)})
    }

    private getItem () {
        console.log('item getItem');
        this.net.getItem({
            Itemnum: this.Itemnum,
            onSuccess: (dsItem) => {
                this.net.getItemImage({
                    _id: dsItem._id,
                    onSuccess: (base64Image) => {
                        dsItem.base64Image = base64Image;
                        this.showItem(dsItem);
                    }
                });
            },
            onError: () => {
                this.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Item',
                    message: 'Ensure your have a strong network signal and sign in again.',
                    okButtonText: 'OK'
                }).then(()=>this.showOrderLines());
            }
        });
    }

    private showItem (dsItem) {
        console.log('item showItem');        
        this.title = dsItem.ItemName;
        this.dsItem = dsItem;
        this.itemData.push({columnLabel: 'Item#',       columnValue: this.Itemnum});
        this.itemData.push({columnLabel: 'Name',        columnValue: dsItem.ItemName});
        this.itemData.push({columnLabel: 'Category',    columnValue: dsItem.Category2});
        this.itemData.push({columnLabel: 'Subcategory', columnValue: dsItem.Category1});
        this.itemData.push({columnLabel: 'On Hand',     columnValue: dsItem.Onhand});
        this.itemData.push({columnLabel: 'Allocated',   columnValue: dsItem.Allocated});
        this.itemData.push({columnLabel: 'Available',   columnValue: dsItem.Onhand - dsItem.Allocated});
        this.itemData.push({columnLabel: 'Price',       columnValue: '$' + dsItem.Price});
        if (dsItem.base64Image) {
            let imgSrc = new ImageSource();
            imgSrc.fromBase64(dsItem.base64Image).then(() => this.itemImage.src = imgSrc);
        }
        this.loading = false;
    }

    private takePicture () {
        console.log('item takePicture',camera.isAvailable());
        if (camera.isAvailable())
            camera.takePicture({keepAspectRatio:true,width:120}).then((imageAsset) => {
                let imgSrc = new ImageSource();
                imgSrc.fromAsset(imageAsset).then((img)=>{
                    const base64Image = img.toBase64String("jpg",60);
                    this.itemImage.src = img;
                    this.net.saveItemImage({
                        _id: this.dsItem['_id'],
                        base64Image: base64Image
                    })
                });
            });
        else
            dialog.alert('Camera is not available in simulator.');
    }

    private showOrderLines () {
        console.log('item showOrderLines');
        this.router.navigate(['/orderlines',this.RepName,this.CustNum,this.Name,this.Ordernum],{clearHistory:true,transition:{name:'fade'}});
    }
}