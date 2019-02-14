"use strict";
// app: Sports
// class: orders
// purpose: download and show orders
// author: mauricio dos santos
// date: january 16 2019
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../common/app");
var net_1 = require("../common/net");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(app, net, page, router, screen) {
        this.app = app;
        this.net = net;
        this.page = page;
        this.router = router;
        this.screen = screen;
        this.backIcon = String.fromCharCode(0xea40);
        this.dsOrder = {};
    }
    OrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('orders ngOnInit');
        this.app.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        setTimeout(function () { return _this.getOrders(); }, 50);
    };
    OrdersComponent.prototype.getOrders = function () {
        var _this = this;
        console.log('orders getOrders', this.CustNum);
        this.net.getOrders({
            CustNum: this.CustNum,
            onSuccess: function (dsOrder) { return _this.showOrders(dsOrder); }
        });
    };
    OrdersComponent.prototype.showOrders = function (dsOrder) {
        console.log('orders showOrders', dsOrder.length);
        this.dsOrder = dsOrder;
        this.title = this.Name;
        this.app.loading = false;
    };
    OrdersComponent.prototype.showOrderLines = function (e) {
        console.log('orders showOrderLines', e.index);
        this.router.navigate(['/orderlines', this.RepName, this.CustNum, this.Name, this.dsOrder[e.index].Ordernum], { clearHistory: true, transition: { name: 'fade' } });
    };
    OrdersComponent.prototype.showCustomers = function () {
        console.log('orders showCustomers');
        this.router.navigate(['/customers', this.RepName], { clearHistory: true, transition: { name: 'fade' } });
    };
    OrdersComponent = __decorate([
        core_1.Component({
            selector: 'ns-orders',
            moduleId: module.id,
            templateUrl: './orders.component.html',
        }),
        __metadata("design:paramtypes", [app_1.app, net_1.net, page_1.Page, router_1.RouterExtensions, router_2.ActivatedRoute])
    ], OrdersComponent);
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yZGVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsb0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5Qix3QkFBd0I7O0FBRXhCLHFDQUFvQztBQUNwQyxxQ0FBb0M7QUFDcEMsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwQ0FBaUQ7QUFDakQsaURBQWdEO0FBU2hEO0lBU0kseUJBQTRCLEdBQVEsRUFBVSxHQUFRLEVBQVUsSUFBVSxFQUFVLE1BQXdCLEVBQVUsTUFBc0I7UUFBaEgsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQU5wSSxhQUFRLEdBQVcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUkvQyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBRTBILENBQUM7SUFFaEosa0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxjQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxtQ0FBUyxHQUFqQjtRQUFBLGlCQU1DO1FBTEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsU0FBUyxFQUFFLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBeEIsQ0FBd0I7U0FDbkQsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLG9DQUFVLEdBQWxCLFVBQW9CLE9BQU87UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU8sd0NBQWMsR0FBdEIsVUFBd0IsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztJQUMxSixDQUFDO0lBRU8sdUNBQWEsR0FBckI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUE1Q1EsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7U0FDekMsQ0FBQzt5Q0FXbUMsU0FBRyxFQUFlLFNBQUcsRUFBZ0IsV0FBSSxFQUFrQix5QkFBZ0IsRUFBa0IsdUJBQWM7T0FUbkksZUFBZSxDQTZDM0I7SUFBRCxzQkFBQztDQUFBLEFBN0NELElBNkNDO0FBN0NZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwOiBTcG9ydHNcbi8vIGNsYXNzOiBvcmRlcnNcbi8vIHB1cnBvc2U6IGRvd25sb2FkIGFuZCBzaG93IG9yZGVyc1xuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDE2IDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtb3JkZXJzJyxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlcnMuY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIE9yZGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIHRpdGxlOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBiYWNrSWNvbjogU3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGVhNDApO1xuICAgIHByaXZhdGUgUmVwTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgQ3VzdE51bTogU3RyaW5nO1xuICAgIHByaXZhdGUgTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgZHNPcmRlciA9IHt9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChwcml2YXRlIGFwcDogYXBwLCBwcml2YXRlIG5ldDogbmV0LCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHNjcmVlbjogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVycyBuZ09uSW5pdCcpO1xuICAgICAgICB0aGlzLmFwcC5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdMb2FkaW5nIG9yZGVycy4uLic7XG4gICAgICAgIHRoaXMuUmVwTmFtZSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snUmVwTmFtZSddO1xuICAgICAgICB0aGlzLkN1c3ROdW0gPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ0N1c3ROdW0nXTtcbiAgICAgICAgdGhpcy5OYW1lID0gdGhpcy5zY3JlZW4uc25hcHNob3QucGFyYW1zWydOYW1lJ107XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuZ2V0T3JkZXJzKCksNTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3JkZXJzICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVycyBnZXRPcmRlcnMnLHRoaXMuQ3VzdE51bSk7XG4gICAgICAgIHRoaXMubmV0LmdldE9yZGVycyh7XG4gICAgICAgICAgICBDdXN0TnVtOiB0aGlzLkN1c3ROdW0sXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IChkc09yZGVyKSA9PiB0aGlzLnNob3dPcmRlcnMoZHNPcmRlcilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dPcmRlcnMgKGRzT3JkZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVycyBzaG93T3JkZXJzJyxkc09yZGVyLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuZHNPcmRlciA9IGRzT3JkZXI7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLk5hbWU7XG4gICAgICAgIHRoaXMuYXBwLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dPcmRlckxpbmVzIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcmRlcnMgc2hvd09yZGVyTGluZXMnLGUuaW5kZXgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcmxpbmVzJyx0aGlzLlJlcE5hbWUsdGhpcy5DdXN0TnVtLHRoaXMuTmFtZSx0aGlzLmRzT3JkZXJbZS5pbmRleF0uT3JkZXJudW1dLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDdXN0b21lcnMgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJzIHNob3dDdXN0b21lcnMnKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3VzdG9tZXJzJyx0aGlzLlJlcE5hbWVdLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbiAgICB9XG59Il19