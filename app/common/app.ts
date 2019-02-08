// app: ULFPod
// class: app
// purpose: general methods and app properties
// author: mauricio dos santos
// date: may 11 2018

import { Injectable } from "@angular/core";

@Injectable()

export class app {

    public props = {
        appKey: 'kid_B1fDHsXzN',
        appSecret: 'ece2258ff70f4cc8934f5dad8913d880',
        limit: 25,
//        protocol: 'https://',
//        domain: '10.0.2.16', /* DEV */
//        rest: '/api/rest/si/',
//        env: 'DEV',
        version: '0-0-0',
        date: 'January 12, 2019'
    }

    public constructor () {}

    public getProperty (property) {
        // console.log('app getProperty',property);
        return this.props[property];
    }
}