// app: Sports
// class: AppRoutingModule
// purpose: routing
// author: mauricio dos santos
// date: january 12 2019

import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { SigninComponent } from "./signin/signin.component";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerComponent } from "./customer/customer.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderDetailComponent } from "./orderdetail/orderdetail.component";
import { OrderLineComponent } from "./orderline/orderline.component";
import { ItemComponent } from "./item/item.component";

const routes: Routes = [
    { path: "", redirectTo: "/signin", pathMatch: "full" },
    { path: "signin", component: SigninComponent},
    { path: "customers/:RepName", component: CustomersComponent },
    { path: "customer/:RepName/:_id", component: CustomerComponent },
    { path: "orders/:RepName/:CustNum/:Name", component: OrdersComponent },
    { path: "orderdetail/:_id/:RepName/:CustNum/:Name/:Ordernum/:tab", component: OrderDetailComponent },
    { path: "orderline/:_id/:RepName/:CustNum/:Name/:Ordernum/:Linenum", component: OrderLineComponent },
    { path: "item/:_id/:RepName/:CustNum/:Name/:Ordernum/:Itemnum", component: ItemComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }