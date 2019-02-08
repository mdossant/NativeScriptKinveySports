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
        this.loading = true;
        this.title = 'Loading order lines...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this.CustNum = this.screen.snapshot.params['CustNum'];
        this.Name = this.screen.snapshot.params['Name'];
        this.Ordernum = this.screen.snapshot.params['Ordernum'];
        setTimeout(function () { return _this.getOrderLines(); }, 50);
    };
    OrderLinesComponent.prototype.animateBall = function (target) {
        var _this = this;
        console.log('orderlines animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({ translate: { x: 0, y: 100 }, duration: 200, curve: enums_1.AnimationCurve.easeIn }).then(function () { if (_this.loading)
                _this.animateBall(target); });
        else
            target.animate({ translate: { x: 0, y: 0 }, duration: 500, curve: enums_1.AnimationCurve.easeOut }).then(function () { if (_this.loading)
                _this.animateBall(target); });
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
        this.loading = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJsaW5lcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlcmxpbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixvQ0FBb0M7QUFDcEMsOEJBQThCO0FBQzlCLHdCQUF3Qjs7QUFFeEIscUNBQW9DO0FBQ3BDLHFDQUFvQztBQUNwQyxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDBDQUFpRDtBQUNqRCxpREFBZ0Q7QUFFaEQsbURBQXlEO0FBU3pEO0lBWUksNkJBQTRCLEdBQVEsRUFBVSxHQUFRLEVBQVUsSUFBVSxFQUFVLE1BQXdCLEVBQVUsTUFBc0I7UUFBaEgsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQVBwSSxhQUFRLEdBQVcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUsvQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQUVzSCxDQUFDO0lBRWhKLHNDQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLHdCQUF3QixDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFD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QVUsR0FBbEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztJQUN2SCxDQUFDO0lBekRRLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0MsQ0FBQzt5Q0FjbUMsU0FBRyxFQUFlLFNBQUcsRUFBZ0IsV0FBSSxFQUFrQix5QkFBZ0IsRUFBa0IsdUJBQWM7T0FabkksbUJBQW1CLENBMEQvQjtJQUFELDBCQUFDO0NBQUEsQUExREQsSUEwREM7QUExRFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwOiBzcG9ydHNcbi8vIGNsYXNzOiBvcmRlcnNcbi8vIHB1cnBvc2U6IGRvd25sb2FkIGFuZCBzaG93IG9yZGVyc1xuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDE2IDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3JztcbmltcG9ydCB7QW5pbWF0aW9uQ3VydmV9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtb3JkZXJsaW5lcycsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXJsaW5lcy5jb21wb25lbnQuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgT3JkZXJMaW5lc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGxvYWRpbmc6IEJvb2xlYW47XG4gICAgcHJpdmF0ZSBiYWxsU3RhdGU6IEJvb2xlYW47XG4gICAgcHJpdmF0ZSB0aXRsZTogU3RyaW5nO1xuICAgIHByaXZhdGUgYmFja0ljb246IFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlYTQwKTtcbiAgICBwcml2YXRlIFJlcE5hbWU6IFN0cmluZztcbiAgICBwcml2YXRlIEN1c3ROdW06IFN0cmluZztcbiAgICBwcml2YXRlIE9yZGVybnVtOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBOYW1lOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBkc09yZGVyTGluZSA9IHt9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChwcml2YXRlIGFwcDogYXBwLCBwcml2YXRlIG5ldDogbmV0LCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHNjcmVlbjogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVybGluZXMgbmdPbkluaXQnKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdMb2FkaW5nIG9yZGVyIGxpbmVzLi4uJztcbiAgICAgICAgdGhpcy5SZXBOYW1lID0gdGhpcy5zY3JlZW4uc25hcHNob3QucGFyYW1zWydSZXBOYW1lJ107XG4gICAgICAgIHRoaXMuQ3VzdE51bSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snQ3VzdE51bSddO1xuICAgICAgICB0aGlzLk5hbWUgPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ05hbWUnXTtcbiAgICAgICAgdGhpcy5PcmRlcm51bSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snT3JkZXJudW0nXTtcbiAgICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5nZXRPcmRlckxpbmVzKCksNTApO1xuICAgIH1cblxuICAgIGFuaW1hdGVCYWxsKHRhcmdldDogVmlldykge1xuICAgICAgICBjb25zb2xlLmxvZygnb3JkZXJsaW5lcyBhbmltYXRlQmFsbCcpO1xuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9ICF0aGlzLmJhbGxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuYmFsbFN0YXRlKVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MTAwfSxkdXJhdGlvbjoyMDAsY3VydmU6QW5pbWF0aW9uQ3VydmUuZWFzZUlufSkudGhlbigoKSA9PiB7aWYgKHRoaXMubG9hZGluZykgdGhpcy5hbmltYXRlQmFsbCh0YXJnZXQpfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MH0sZHVyYXRpb246NTAwLGN1cnZlOkFuaW1hdGlvbkN1cnZlLmVhc2VPdXR9KS50aGVuKCgpID0+IHtpZiAodGhpcy5sb2FkaW5nKSB0aGlzLmFuaW1hdGVCYWxsKHRhcmdldCl9KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3JkZXJMaW5lcyAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcmRlcmxpbmVzIGdldE9yZGVyTGluZXMnLHRoaXMuT3JkZXJudW0pO1xuICAgICAgICB0aGlzLm5ldC5nZXRPcmRlckxpbmVzKHtcbiAgICAgICAgICAgIE9yZGVybnVtOiB0aGlzLk9yZGVybnVtLFxuICAgICAgICAgICAgb25TdWNjZXNzOiAoZHNPcmRlckxpbmUpID0+IHRoaXMuc2hvd09yZGVyTGluZXMoZHNPcmRlckxpbmUpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93T3JkZXJMaW5lcyAoZHNPcmRlckxpbmUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVybGluZXMgc2hvd09yZGVyTGluZXMnLGRzT3JkZXJMaW5lLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuZHNPcmRlckxpbmUgPSBkc09yZGVyTGluZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdPcmRlciMgJyArIHRoaXMuT3JkZXJudW07XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0l0ZW0gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29yZGVybGluZXMgc2hvd0l0ZW0nLGUuaW5kZXgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9pdGVtJyx0aGlzLlJlcE5hbWUsdGhpcy5DdXN0TnVtLHRoaXMuTmFtZSx0aGlzLk9yZGVybnVtLHRoaXMuZHNPcmRlckxpbmVbZS5pbmRleF0uSXRlbW51bV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd09yZGVycyAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcmRlcmxpbmVzIHNob3dPcmRlcicpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcnMnLHRoaXMuUmVwTmFtZSx0aGlzLkN1c3ROdW0sdGhpcy5OYW1lXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxufSJdfQ==