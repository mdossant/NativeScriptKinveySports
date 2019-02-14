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
import { OrderLinesComponent } from "./orderlines/orderlines.component";
import { ItemComponent } from "./item/item.component";

const routes: Routes = [
    { path: "", redirectTo: "/signin", pathMatch: "full" },
    { path: "signin", component: SigninComponent},
    { path: "customers/:RepName", component: CustomersComponent },
    { path: "customer/:RepName/:_id", component: CustomerComponent },
    { path: "orders/:RepName/:CustNum/:Name", component: OrdersComponent },
    { path: "orderlines/:RepName/:CustNum/:Name/:Ordernum", component: OrderLinesComponent },
    { path: "item/:RepName/:CustNum/:Name/:Ordernum/:Itemnum", component: ItemComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }