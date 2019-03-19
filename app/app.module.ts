import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { app } from "./common/app";
import { net } from "./common/net";

import { SigninComponent } from "./signin/signin.component";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerComponent } from "./customer/customer.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderLinesComponent } from "./orderlines/orderlines.component";
import { OrderDetailComponent } from "./orderdetail/orderdetail.component";
import { ItemComponent } from "./item/item.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        SigninComponent,
        CustomersComponent,
        CustomerComponent,
        OrdersComponent,
        OrderLinesComponent,
        OrderDetailComponent,
        ItemComponent
    ],
    providers: [
        app,
        net
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
