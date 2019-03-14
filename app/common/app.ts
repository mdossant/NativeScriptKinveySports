// app: Sports
// class: app
// purpose: general methods and app properties
// author: mauricio dos santos
// date: may 11 2018

import { Injectable } from "@angular/core";
import {AnimationCurve} from 'tns-core-modules/ui/enums';

@Injectable()

export class app {

    public props = {
        appKey: 'kid_B1fDHsXzN',
        appSecret: 'ece2258ff70f4cc8934f5dad8913d880',
        limit: 32,
        version: '0-0-0',
        date: 'March 14, 2019'
    }
    public loading: Boolean;
    private loadingState: Boolean;

    public constructor () {}

    private animateLoading(target) {
        console.log('app animateLoading');
        this.loadingState = !this.loadingState;
        if (this.loadingState)
            target.animate({translate:{x:0,y:100},duration:200,curve:AnimationCurve.easeIn}).then(() => {if (this.loading) this.animateLoading(target)})
        else
            target.animate({translate:{x:0,y:0},duration:500,curve:AnimationCurve.easeOut}).then(() => {if (this.loading) this.animateLoading(target)})
    }
    
    public getProperty (property) {
        console.log('app getProperty',property);
        return this.props[property];
    }
}