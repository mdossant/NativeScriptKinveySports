// app: Sports
// class: signin
// purpose: sign in to application
// author: mauricio dos santos
// date: january 12 2019

import { app } from '../common/app';
import { net } from '../common/net';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as dialog from 'tns-core-modules/ui/dialogs';
//import * as application from 'tns-core-modules/application';

@Component({
    selector: 'ns-signin',
    moduleId: module.id,
    templateUrl: './signin.component.html',
})

export class SigninComponent implements OnInit {
    private resetIcon: String = String.fromCharCode(0xe964);
    private appVersion: String;
    private appDate: String;
    private userName: TextField;
    private password: TextField;
    private btnText: String;
    private btnEnabled: Boolean = false;
    private fieldsEnabled: Boolean = true;

    ngOnInit(): void {
        console.log('signin ngOnInit');
        //application.android.off(application.AndroidApplication.activityBackPressedEvent);
        //application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => args.cancel = true);
        this.btnText = 'SIGN IN';
        this.userName = <TextField> this.page.getViewById('userName');
        this.password = <TextField> this.page.getViewById('password');
        this.userName.text = 'RDR';
        this.password.text = 'rdr';
        setTimeout(()=>this.userName.focus(),100);
//        this.router.navigate(['/customers'],{clearHistory:true,transition:{name:'fade'}});
//        this.router.navigate(['/customer',1],{clearHistory:true,transition:{name:'fade'}});
//        this.router.navigate(['/orders',1],{clearHistory:true,transition:{name:'fade'}});
//        this.router.navigate(['/order',1,1],{clearHistory:true,transition:{name:'fade'}});
//        this.router.navigate(['/shop',1],{clearHistory:true,transition:{name:'fade'}});
//        this.router.navigate(['/item',1,1,'',1,'2'],{clearHistory:true,transition:{name:'fade'}});
    }

    public constructor (private app: app, private net: net, private page: Page, private router: RouterExtensions) {
        console.log('signin constructor');
        this.appVersion = 'version ' + this.app.props.version;
        this.appDate = 'as of ' + this.app.props.date;
    }

    private enableSignin () {
        console.log('signin enableSignin');
        this.btnText = 'SIGN IN';
        this.btnEnabled = true;
        this.fieldsEnabled = true;
        setTimeout(()=>this.userName.focus(),100);
    }

    private newUsername () {
        console.log('signin newUsername');
        this.btnEnabled = (this.userName.text != undefined && this.userName.text != '' && this.password.text != undefined && this.password.text != '');
    }

    private newPassword () {
        console.log('signin newPassword');
        this.btnEnabled = (this.userName.text != undefined && this.userName.text != '' && this.password.text != undefined && this.password.text != '');
    }

    private signinSuccess (RepName) {
        console.log('signin signinSuccess',RepName);
        this.router.navigate(['/customers',RepName],{clearHistory:true,transition:{name:'fade'}});
    }

    private signinFail () {
        console.log('signin signinFail');
        dialog.confirm({
            title: 'Sign In Failed',
            message: 'Ensure your have a strong network signal and entered a valid username and password.',
            okButtonText: 'OK'
        }).then(()=>this.enableSignin());
    }

    private signin () {
        console.log('signin signin',this.userName.text,this.password.text);
        this.btnText = 'Signing in...';
        this.btnEnabled = false;
        this.fieldsEnabled = false;
        this.userName.dismissSoftInput();
        this.password.dismissSoftInput();
        this.net.authenticate({
            userName: this.userName.text,
            password: this.password.text,
            onSuccess: (RepName) => {
                setTimeout(()=>this.signinSuccess(RepName),50)
            },
            onError: () => {
                setTimeout(()=>this.signinFail(),50)
            }
        });
    }
}