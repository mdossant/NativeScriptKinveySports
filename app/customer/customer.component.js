"use strict";
// app: Sports
// class: customer
// purpose: download and show customer
// author: mauricio dos santos
// date: january 15 2019
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../common/app");
var net_1 = require("../common/net");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialog = require("tns-core-modules/ui/dialogs");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(app, net, page, router, screen) {
        this.app = app;
        this.net = net;
        this.page = page;
        this.router = router;
        this.screen = screen;
        this.backIcon = String.fromCharCode(0xea40);
        this.dsCustomer = {};
        this.dsOrder = {};
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('customer ngOnInit');
        this.app.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this._id = this.screen.snapshot.params['_id'];
        setTimeout(function () { return _this.getCustomer(); }, 50);
    };
    CustomerComponent.prototype.getCustomer = function () {
        var _this = this;
        console.log('customer getCustomer');
        this.net.getCustomer({
            _id: this._id,
            onSuccess: function (dsCustomer) { return _this.showCustomer(dsCustomer); },
            onError: function () {
                _this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Customer',
                    message: 'Ensure your have a strong network signal and sign in again.',
                    okButtonText: 'OK'
                }).then(function () { return _this.showCustomers(); });
            }
        });
    };
    CustomerComponent.prototype.showCustomer = function (dsCustomer) {
        console.log('customer showCustomer', dsCustomer);
        this.dsCustomer = dsCustomer;
        this.title = dsCustomer.Name;
        this.getOrders(dsCustomer.CustNum);
    };
    CustomerComponent.prototype.getOrders = function (CustNum) {
        var _this = this;
        console.log('customer getOrders', CustNum);
        this.net.getOrders({
            CustNum: CustNum,
            onSuccess: function (dsOrder) { return _this.showOrders(dsOrder); }
        });
    };
    CustomerComponent.prototype.showOrders = function (dsOrder) {
        console.log('customer showOrders', dsOrder.length);
        this.dsOrder = dsOrder;
        this.app.loading = false;
    };
    CustomerComponent.prototype.showOrder = function (e) {
        console.log('customer showOrder', e.index);
        //        this.router.navigate(['/order'],{clearHistory:true,transition:{name:'fade'}});
    };
    CustomerComponent.prototype.showCustomers = function () {
        console.log('customer showCustomers');
        this.router.navigate(['/customers', this.RepName], { clearHistory: true, transition: { name: 'fade' } });
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'ns-customer',
            moduleId: module.id,
            templateUrl: './customer.component.html',
        }),
        __metadata("design:paramtypes", [app_1.app, net_1.net, page_1.Page, router_1.RouterExtensions, router_2.ActivatedRoute])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2Qsa0JBQWtCO0FBQ2xCLHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsd0JBQXdCOztBQUV4QixxQ0FBb0M7QUFDcEMscUNBQW9DO0FBQ3BDLHNDQUFrRDtBQUNsRCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGlEQUFnRDtBQUNoRCxvREFBc0Q7QUFRdEQ7SUFTSSwyQkFBNEIsR0FBUSxFQUFVLEdBQVEsRUFBVSxJQUFVLEVBQVUsTUFBd0IsRUFBVSxNQUFzQjtRQUFoSCxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTnBJLGFBQVEsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRy9DLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQUUwSCxDQUFDO0lBRWhKLG9DQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5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aUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHA6IFNwb3J0c1xuLy8gY2xhc3M6IGN1c3RvbWVyXG4vLyBwdXJwb3NlOiBkb3dubG9hZCBhbmQgc2hvdyBjdXN0b21lclxuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDE1IDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtY3VzdG9tZXInLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIHRpdGxlOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBiYWNrSWNvbjogU3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGVhNDApO1xuICAgIHByaXZhdGUgUmVwTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgX2lkOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBkc0N1c3RvbWVyID0ge307XG4gICAgcHJpdmF0ZSBkc09yZGVyID0ge307XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHByaXZhdGUgYXBwOiBhcHAsIHByaXZhdGUgbmV0OiBuZXQsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgc2NyZWVuOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgbmdPbkluaXQnKTtcbiAgICAgICAgdGhpcy5hcHAubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMudGl0bGUgPSAnTG9hZGluZyBvcmRlcnMuLi4nO1xuICAgICAgICB0aGlzLlJlcE5hbWUgPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ1JlcE5hbWUnXTtcbiAgICAgICAgdGhpcy5faWQgPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ19pZCddO1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLmdldEN1c3RvbWVyKCksNTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3VzdG9tZXIgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgZ2V0Q3VzdG9tZXInKTtcbiAgICAgICAgdGhpcy5uZXQuZ2V0Q3VzdG9tZXIoe1xuICAgICAgICAgICAgX2lkOiB0aGlzLl9pZCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogKGRzQ3VzdG9tZXIpID0+IHRoaXMuc2hvd0N1c3RvbWVyKGRzQ3VzdG9tZXIpLFxuICAgICAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ291bGQgTm90IERvd25sb2FkIEN1c3RvbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0Vuc3VyZSB5b3VyIGhhdmUgYSBzdHJvbmcgbmV0d29yayBzaWduYWwgYW5kIHNpZ24gaW4gYWdhaW4uJyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT0snXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKT0+dGhpcy5zaG93Q3VzdG9tZXJzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDdXN0b21lciAoZHNDdXN0b21lcikge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgc2hvd0N1c3RvbWVyJyxkc0N1c3RvbWVyKTtcbiAgICAgICAgdGhpcy5kc0N1c3RvbWVyID0gZHNDdXN0b21lcjtcbiAgICAgICAgdGhpcy50aXRsZSA9IGRzQ3VzdG9tZXIuTmFtZTtcbiAgICAgICAgdGhpcy5nZXRPcmRlcnMoZHNDdXN0b21lci5DdXN0TnVtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE9yZGVycyAoQ3VzdE51bSkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgZ2V0T3JkZXJzJyxDdXN0TnVtKTtcbiAgICAgICAgdGhpcy5uZXQuZ2V0T3JkZXJzKHtcbiAgICAgICAgICAgIEN1c3ROdW06IEN1c3ROdW0sXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IChkc09yZGVyKSA9PiB0aGlzLnNob3dPcmRlcnMoZHNPcmRlcilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dPcmRlcnMgKGRzT3JkZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVyIHNob3dPcmRlcnMnLGRzT3JkZXIubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5kc09yZGVyID0gZHNPcmRlcjtcbiAgICAgICAgdGhpcy5hcHAubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd09yZGVyIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBzaG93T3JkZXInLGUuaW5kZXgpO1xuLy8gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL29yZGVyJ10se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0N1c3RvbWVycyAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBzaG93Q3VzdG9tZXJzJyk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2N1c3RvbWVycycsdGhpcy5SZXBOYW1lXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxufSJdfQ==