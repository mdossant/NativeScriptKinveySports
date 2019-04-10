// app: Sports
// class: app
// purpose: general methods and app properties
// author: mauricio dos santos
// date: may 11 2018

import { Injectable } from "@angular/core";
import {AnimationCurve} from 'tns-core-modules/ui/enums';
import { opacityProperty } from "tns-core-modules/ui/page/page";

@Injectable()

export class app {

    public props = {
        appKey: 'kid_B1fDHsXzN',
        appSecret: 'ece2258ff70f4cc8934f5dad8913d880',
        limit: 25,
        version: '0-0-3',
        date: 'April 10, 2019'
    }
    public loading: Boolean;
    private loadingState: Boolean;

    public constructor () {}

    public animateLoading (target) {
        console.log('app animateLoading');
        this.loadingState = !this.loadingState;
        if (this.loadingState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateLoading(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateLoading(target)})
    }

    // ===== animateIcon =====
    // target (view): icon's view to animate
    // onSuccess (method): success callback method
    public animateIcon (params) {
        console.log('app animateIcon');
        params.target.animate({opacity:0,duration:200}).then(() => params.target.animate({opacity:1,duration:200})).then(() => params.onSuccess());
    }
    
    public getProperty (property) {
        console.log('app getProperty',property);
        return this.props[property];
    }
}