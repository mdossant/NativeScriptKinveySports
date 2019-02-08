"use strict";
// app: sports
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
var enums_1 = require("tns-core-modules/ui/enums");
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
        this.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        setTimeout(function () { return _this.getOrders(); }, 50);
    };
    OrdersComponent.prototype.animateBall = function (target) {
        var _this = this;
        console.log('orders animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({ translate: { x: 0, y: 100 }, duration: 200, curve: enums_1.AnimationCurve.easeIn }).then(function () { if (_this.loading)
                _this.animateBall(target); });
        else
            target.animate({ translate: { x: 0, y: 0 }, duration: 500, curve: enums_1.AnimationCurve.easeOut }).then(function () { if (_this.loading)
                _this.animateBall(target); });
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
        this.loading = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yZGVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsb0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5Qix3QkFBd0I7O0FBRXhCLHFDQUFvQztBQUNwQyxxQ0FBb0M7QUFDcEMsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwQ0FBaUQ7QUFDakQsaURBQWdEO0FBRWhELG1EQUF5RDtBQVN6RDtJQVdJLHlCQUE0QixHQUFRLEVBQVUsR0FBUSxFQUFVLElBQVUsRUFBVSxNQUF3QixFQUFVLE1BQXNCO1FBQWhILFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFOcEksYUFBUSxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFJL0MsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQUUwSCxDQUFDO0lBRWhKLGtDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxjQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksTUFBWTtRQUF4QixpQkFPQztRQU5HLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLHNCQUFjLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQTtRQUM3SSxJQUFJO1lBQ0EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLHNCQUFjLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUNoSixDQUFDO0lBRU8sbUNBQVMsR0FBakI7UUFBQSxpQkFNQztRQUxHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFNBQVMsRUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQXhCLENBQXdCO1NBQ25ELENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyxvQ0FBVSxHQUFsQixVQUFvQixPQUFPO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU8sd0NBQWMsR0FBdEIsVUFBd0IsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztJQUMxSixDQUFDO0lBRU8sdUNBQWEsR0FBckI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUF2RFEsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7U0FDekMsQ0FBQzt5Q0FhbUMsU0FBRyxFQUFlLFNBQUcsRUFBZ0IsV0FBSSxFQUFrQix5QkFBZ0IsRUFBa0IsdUJBQWM7T0FYbkksZUFBZSxDQXdEM0I7SUFBRCxzQkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwOiBzcG9ydHNcbi8vIGNsYXNzOiBvcmRlcnNcbi8vIHB1cnBvc2U6IGRvd25sb2FkIGFuZCBzaG93IG9yZGVyc1xuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDE2IDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3JztcbmltcG9ydCB7QW5pbWF0aW9uQ3VydmV9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtb3JkZXJzJyxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlcnMuY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIE9yZGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGxvYWRpbmc6IEJvb2xlYW47XG4gICAgcHJpdmF0ZSBiYWxsU3RhdGU6IEJvb2xlYW47XG4gICAgcHJpdmF0ZSB0aXRsZTogU3RyaW5nO1xuICAgIHByaXZhdGUgYmFja0ljb246IFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlYTQwKTtcbiAgICBwcml2YXRlIFJlcE5hbWU6IFN0cmluZztcbiAgICBwcml2YXRlIEN1c3ROdW06IFN0cmluZztcbiAgICBwcml2YXRlIE5hbWU6IFN0cmluZztcbiAgICBwcml2YXRlIGRzT3JkZXIgPSB7fTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAocHJpdmF0ZSBhcHA6IGFwcCwgcHJpdmF0ZSBuZXQ6IG5ldCwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBzY3JlZW46IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcmRlcnMgbmdPbkluaXQnKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdMb2FkaW5nIG9yZGVycy4uLic7XG4gICAgICAgIHRoaXMuUmVwTmFtZSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snUmVwTmFtZSddO1xuICAgICAgICB0aGlzLkN1c3ROdW0gPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ0N1c3ROdW0nXTtcbiAgICAgICAgdGhpcy5OYW1lID0gdGhpcy5zY3JlZW4uc25hcHNob3QucGFyYW1zWydOYW1lJ107XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuZ2V0T3JkZXJzKCksNTApO1xuICAgIH1cblxuICAgIGFuaW1hdGVCYWxsKHRhcmdldDogVmlldykge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJzIGFuaW1hdGVCYWxsJyk7XG4gICAgICAgIHRoaXMuYmFsbFN0YXRlID0gIXRoaXMuYmFsbFN0YXRlO1xuICAgICAgICBpZiAodGhpcy5iYWxsU3RhdGUpXG4gICAgICAgICAgICB0YXJnZXQuYW5pbWF0ZSh7dHJhbnNsYXRlOnt4OjAseToxMDB9LGR1cmF0aW9uOjIwMCxjdXJ2ZTpBbmltYXRpb25DdXJ2ZS5lYXNlSW59KS50aGVuKCgpID0+IHtpZiAodGhpcy5sb2FkaW5nKSB0aGlzLmFuaW1hdGVCYWxsKHRhcmdldCl9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0YXJnZXQuYW5pbWF0ZSh7dHJhbnNsYXRlOnt4OjAseTowfSxkdXJhdGlvbjo1MDAsY3VydmU6QW5pbWF0aW9uQ3VydmUuZWFzZU91dH0pLnRoZW4oKCkgPT4ge2lmICh0aGlzLmxvYWRpbmcpIHRoaXMuYW5pbWF0ZUJhbGwodGFyZ2V0KX0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPcmRlcnMgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJzIGdldE9yZGVycycsdGhpcy5DdXN0TnVtKTtcbiAgICAgICAgdGhpcy5uZXQuZ2V0T3JkZXJzKHtcbiAgICAgICAgICAgIEN1c3ROdW06IHRoaXMuQ3VzdE51bSxcbiAgICAgICAgICAgIG9uU3VjY2VzczogKGRzT3JkZXIpID0+IHRoaXMuc2hvd09yZGVycyhkc09yZGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd09yZGVycyAoZHNPcmRlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJzIHNob3dPcmRlcnMnLGRzT3JkZXIubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5kc09yZGVyID0gZHNPcmRlcjtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuTmFtZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93T3JkZXJMaW5lcyAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJzIHNob3dPcmRlckxpbmVzJyxlLmluZGV4KTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3JkZXJsaW5lcycsdGhpcy5SZXBOYW1lLHRoaXMuQ3VzdE51bSx0aGlzLk5hbWUsdGhpcy5kc09yZGVyW2UuaW5kZXhdLk9yZGVybnVtXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Q3VzdG9tZXJzICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVycyBzaG93Q3VzdG9tZXJzJyk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2N1c3RvbWVycycsdGhpcy5SZXBOYW1lXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxufSJdfQ==