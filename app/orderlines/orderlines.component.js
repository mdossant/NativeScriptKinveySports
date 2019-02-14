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
var OrderLinesComponent = /** @class */ (function () {
    function OrderLinesComponent(app, net, page, router, screen) {
        this.app = app;
        this.net = net;
        this.page = page;
        this.router = router;
        this.screen = screen;
        this.backIcon = String.fromCharCode(0xea40);
        this.dsOrderLine = {};
    }
    OrderLinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('orderlines ngOnInit');
        this.app.loading = true;
        this.title = 'Loading order lines...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        setTimeout(function () { return _this.getOrderLines(); }, 50);
    };
    OrderLinesComponent.prototype.getOrderLines = function () {
        var _this = this;
        console.log('orderlines getOrderLines', this.Ordernum);
        this.net.getOrderLines({
            Ordernum: this.Ordernum,
            onSuccess: function (dsOrderLine) { return _this.showOrderLines(dsOrderLine); }
        });
    };
    OrderLinesComponent.prototype.showOrderLines = function (dsOrderLine) {
        console.log('orderlines showOrderLines', dsOrderLine.length);
        this.dsOrderLine = dsOrderLine;
        this.title = 'Order# ' + this.Ordernum;
        this.app.loading = false;
    };
    OrderLinesComponent.prototype.showItem = function (e) {
        console.log('orderlines showItem', e.index);
        this.router.navigate(['/item', this.RepName, this.CustNum, this.Name, this.Ordernum, this.dsOrderLine[e.index].Itemnum], { clearHistory: true, transition: { name: 'fade' } });
    };
    OrderLinesComponent.prototype.showOrders = function () {
        console.log('orderlines showOrder');
        this.router.navigate(['/orders', this.RepName, this.CustNum, this.Name], { clearHistory: true, transition: { name: 'fade' } });
    };
    OrderLinesComponent = __decorate([
        core_1.Component({
            selector: 'ns-orderlines',
            moduleId: module.id,
            templateUrl: './orderlines.component.html',
        }),
        __metadata("design:paramtypes", [app_1.app, net_1.net, page_1.Page, router_1.RouterExtensions, router_2.ActivatedRoute])
    ], OrderLinesComponent);
    return OrderLinesComponent;
}());
exports.OrderLinesComponent = OrderLinesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJsaW5lcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlcmxpbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixvQ0FBb0M7QUFDcEMsOEJBQThCO0FBQzlCLHdCQUF3Qjs7QUFFeEIscUNBQW9DO0FBQ3BDLHFDQUFvQztBQUNwQyxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDBDQUFpRDtBQUNqRCxpREFBZ0Q7QUFTaEQ7SUFVSSw2QkFBNEIsR0FBUSxFQUFVLEdBQVEsRUFBVSxJQUFVLEVBQVUsTUFBd0IsRUFBVSxNQUFzQjtRQUFoSCxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBUHBJLGFBQVEsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBSy9DLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXNILENBQUM7SUFFaEosc0NBQVEsR0FBUjtRQUFBLGlCQVNDO1FBUkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLHdCQUF3QixDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELFVBQVUsQ0FBQyxjQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTywyQ0FBYSxHQUFyQjtRQUFBLGlCQU1DO1FBTEcsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxVQUFDLFdBQVcsSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQWhDLENBQWdDO1NBQy9ELENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyw0Q0FBYyxHQUF0QixVQUF3QixXQUFXO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFTyxzQ0FBUSxHQUFoQixVQUFrQixDQUFDO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztJQUNySyxDQUFDO0lBRU8sd0NBQVUsR0FBbEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztJQUN2SCxDQUFDO0lBOUNRLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0MsQ0FBQzt5Q0FZbUMsU0FBRyxFQUFlLFNBQUcsRUFBZ0IsV0FBSSxFQUFrQix5QkFBZ0IsRUFBa0IsdUJBQWM7T0FWbkksbUJBQW1CLENBK0MvQjtJQUFELDBCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwOiBTcG9ydHNcbi8vIGNsYXNzOiBvcmRlcnNcbi8vIHB1cnBvc2U6IGRvd25sb2FkIGFuZCBzaG93IG9yZGVyc1xuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDE2IDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtb3JkZXJsaW5lcycsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXJsaW5lcy5jb21wb25lbnQuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgT3JkZXJMaW5lc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIHRpdGxlOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBiYWNrSWNvbjogU3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGVhNDApO1xuICAgIHByaXZhdGUgUmVwTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgQ3VzdE51bTogU3RyaW5nO1xuICAgIHByaXZhdGUgT3JkZXJudW06IFN0cmluZztcbiAgICBwcml2YXRlIE5hbWU6IFN0cmluZztcbiAgICBwcml2YXRlIGRzT3JkZXJMaW5lID0ge307XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHByaXZhdGUgYXBwOiBhcHAsIHByaXZhdGUgbmV0OiBuZXQsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgc2NyZWVuOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJsaW5lcyBuZ09uSW5pdCcpO1xuICAgICAgICB0aGlzLmFwcC5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdMb2FkaW5nIG9yZGVyIGxpbmVzLi4uJztcbiAgICAgICAgdGhpcy5SZXBOYW1lID0gdGhpcy5zY3JlZW4uc25hcHNob3QucGFyYW1zWydSZXBOYW1lJ107XG4gICAgICAgIHRoaXMuQ3VzdE51bSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snQ3VzdE51bSddO1xuICAgICAgICB0aGlzLk5hbWUgPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ05hbWUnXTtcbiAgICAgICAgdGhpcy5PcmRlcm51bSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snT3JkZXJudW0nXTtcbiAgICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5nZXRPcmRlckxpbmVzKCksNTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3JkZXJMaW5lcyAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcmRlcmxpbmVzIGdldE9yZGVyTGluZXMnLHRoaXMuT3JkZXJudW0pO1xuICAgICAgICB0aGlzLm5ldC5nZXRPcmRlckxpbmVzKHtcbiAgICAgICAgICAgIE9yZGVybnVtOiB0aGlzLk9yZGVybnVtLFxuICAgICAgICAgICAgb25TdWNjZXNzOiAoZHNPcmRlckxpbmUpID0+IHRoaXMuc2hvd09yZGVyTGluZXMoZHNPcmRlckxpbmUpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93T3JkZXJMaW5lcyAoZHNPcmRlckxpbmUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVybGluZXMgc2hvd09yZGVyTGluZXMnLGRzT3JkZXJMaW5lLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuZHNPcmRlckxpbmUgPSBkc09yZGVyTGluZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdPcmRlciMgJyArIHRoaXMuT3JkZXJudW07XG4gICAgICAgIHRoaXMuYXBwLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dJdGVtIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcmRlcmxpbmVzIHNob3dJdGVtJyxlLmluZGV4KTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaXRlbScsdGhpcy5SZXBOYW1lLHRoaXMuQ3VzdE51bSx0aGlzLk5hbWUsdGhpcy5PcmRlcm51bSx0aGlzLmRzT3JkZXJMaW5lW2UuaW5kZXhdLkl0ZW1udW1dLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dPcmRlcnMgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJsaW5lcyBzaG93T3JkZXInKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3JkZXJzJyx0aGlzLlJlcE5hbWUsdGhpcy5DdXN0TnVtLHRoaXMuTmFtZV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cbn0iXX0=