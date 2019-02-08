"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var http_client_1 = require("nativescript-angular/http-client");
var app_1 = require("./common/app");
var net_1 = require("./common/net");
var signin_component_1 = require("./signin/signin.component");
var customers_component_1 = require("./customers/customers.component");
var customer_component_1 = require("./customer/customer.component");
var orders_component_1 = require("./orders/orders.component");
var orderlines_component_1 = require("./orderlines/orderlines.component");
var item_component_1 = require("./item/item.component");
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
                http_client_1.NativeScriptHttpClientModule
            ],
            declarations: [
                app_component_1.AppComponent,
                signin_component_1.SigninComponent,
                customers_component_1.CustomersComponent,
                customer_component_1.CustomerComponent,
                orders_component_1.OrdersComponent,
                orderlines_component_1.OrderLinesComponent,
                item_component_1.ItemComponent
            ],
            providers: [
                app_1.app,
                net_1.net
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsZ0VBQWdGO0FBRWhGLG9DQUFtQztBQUNuQyxvQ0FBbUM7QUFFbkMsOERBQTREO0FBQzVELHVFQUFxRTtBQUNyRSxvRUFBa0U7QUFDbEUsOERBQTREO0FBQzVELDBFQUF3RTtBQUN4RSx3REFBc0Q7QUFFdEQsMkVBQTJFO0FBQzNFLHdFQUF3RTtBQUV4RSw2RUFBNkU7QUFDN0Usc0VBQXNFO0FBK0J0RTtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUE3QnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsOEJBQWdCO2dCQUNoQiwwQ0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osa0NBQWU7Z0JBQ2Ysd0NBQWtCO2dCQUNsQixzQ0FBaUI7Z0JBQ2pCLGtDQUFlO2dCQUNmLDBDQUFtQjtnQkFDbkIsOEJBQWE7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsU0FBRztnQkFDSCxTQUFHO2FBQ047WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi9jb21tb24vYXBwXCI7XG5pbXBvcnQgeyBuZXQgfSBmcm9tIFwiLi9jb21tb24vbmV0XCI7XG5cbmltcG9ydCB7IFNpZ25pbkNvbXBvbmVudCB9IGZyb20gXCIuL3NpZ25pbi9zaWduaW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDdXN0b21lcnNDb21wb25lbnQgfSBmcm9tIFwiLi9jdXN0b21lcnMvY3VzdG9tZXJzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jdXN0b21lci9jdXN0b21lci5jb21wb25lbnRcIjtcbmltcG9ydCB7IE9yZGVyc0NvbXBvbmVudCB9IGZyb20gXCIuL29yZGVycy9vcmRlcnMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlckxpbmVzQ29tcG9uZW50IH0gZnJvbSBcIi4vb3JkZXJsaW5lcy9vcmRlcmxpbmVzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSXRlbUNvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0vaXRlbS5jb21wb25lbnRcIjtcblxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdHdvLXdheSBiaW5kaW5nXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzICBpZiB5b3UgbmVlZCB0byB1c2UgdGhlIEhUVFAgd3JhcHBlclxuLy8gaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIFNpZ25pbkNvbXBvbmVudCxcbiAgICAgICAgQ3VzdG9tZXJzQ29tcG9uZW50LFxuICAgICAgICBDdXN0b21lckNvbXBvbmVudCxcbiAgICAgICAgT3JkZXJzQ29tcG9uZW50LFxuICAgICAgICBPcmRlckxpbmVzQ29tcG9uZW50LFxuICAgICAgICBJdGVtQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgYXBwLFxuICAgICAgICBuZXRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=