"use strict";
// app: sports
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
var enums_1 = require("tns-core-modules/ui/enums");
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
        this.loading = true;
        this.title = 'Loading orders...';
        this.RepName = this.screen.snapshot.params['RepName'];
        this._id = this.screen.snapshot.params['_id'];
        setTimeout(function () { return _this.getCustomer(); }, 50);
    };
    CustomerComponent.prototype.animateBall = function (target) {
        var _this = this;
        console.log('customer animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({ translate: { x: 0, y: 100 }, duration: 200, curve: enums_1.AnimationCurve.easeIn }).then(function () { if (_this.loading)
                _this.animateBall(target); });
        else
            target.animate({ translate: { x: 0, y: 0 }, duration: 500, curve: enums_1.AnimationCurve.easeOut }).then(function () { if (_this.loading)
                _this.animateBall(target); });
    };
    CustomerComponent.prototype.getCustomer = function () {
        var _this = this;
        console.log('customer getCustomer');
        this.net.getCustomer({
            _id: this._id,
            onSuccess: function (dsCustomer) { return _this.showCustomer(dsCustomer); },
            onError: function () {
                _this.loading = false;
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
        this.loading = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2Qsa0JBQWtCO0FBQ2xCLHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsd0JBQXdCOztBQUV4QixxQ0FBb0M7QUFDcEMscUNBQW9DO0FBQ3BDLHNDQUFrRDtBQUNsRCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGlEQUFnRDtBQUVoRCxtREFBeUQ7QUFDekQsb0RBQXNEO0FBUXREO0lBV0ksMkJBQTRCLEdBQVEsRUFBVSxHQUFRLEVBQVUsSUFBVSxFQUFVLE1BQXdCLEVBQVUsTUFBc0I7UUFBaEgsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQU5wSSxhQUFRLEdBQVcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUcvQyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFFMEgsQ0FBQztJQUVoSixvQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztR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QUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVPLHFDQUFTLEdBQWpCLFVBQW1CLENBQUM7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsd0ZBQXdGO0lBQ3BGLENBQUM7SUFFTyx5Q0FBYSxHQUFyQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQTVFUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1NBQzNDLENBQUM7eUNBYW1DLFNBQUcsRUFBZSxTQUFHLEVBQWdCLFdBQUksRUFBa0IseUJBQWdCLEVBQWtCLHVCQUFjO09BWG5JLGlCQUFpQixDQTZFN0I7SUFBRCx3QkFBQztDQUFBLEFBN0VELElBNkVDO0FBN0VZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcDogc3BvcnRzXG4vLyBjbGFzczogY3VzdG9tZXJcbi8vIHB1cnBvc2U6IGRvd25sb2FkIGFuZCBzaG93IGN1c3RvbWVyXG4vLyBhdXRob3I6IG1hdXJpY2lvIGRvcyBzYW50b3Ncbi8vIGRhdGU6IGphbnVhcnkgMTUgMjAxOVxuXG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuLi9jb21tb24vYXBwJztcbmltcG9ydCB7IG5ldCB9IGZyb20gJy4uL2NvbW1vbi9uZXQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtBbmltYXRpb25DdXJ2ZX0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcyc7XG5pbXBvcnQgKiBhcyBkaWFsb2cgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICducy1jdXN0b21lcicsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXIuY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgbG9hZGluZzogQm9vbGVhbjtcbiAgICBwcml2YXRlIGJhbGxTdGF0ZTogQm9vbGVhbjtcbiAgICBwcml2YXRlIHRpdGxlOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBiYWNrSWNvbjogU3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGVhNDApO1xuICAgIHByaXZhdGUgUmVwTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgX2lkOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBkc0N1c3RvbWVyID0ge307XG4gICAgcHJpdmF0ZSBkc09yZGVyID0ge307XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHByaXZhdGUgYXBwOiBhcHAsIHByaXZhdGUgbmV0OiBuZXQsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgc2NyZWVuOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgbmdPbkluaXQnKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdMb2FkaW5nIG9yZGVycy4uLic7XG4gICAgICAgIHRoaXMuUmVwTmFtZSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snUmVwTmFtZSddO1xuICAgICAgICB0aGlzLl9pZCA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snX2lkJ107XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuZ2V0Q3VzdG9tZXIoKSw1MCk7XG4gICAgfVxuXG4gICAgYW5pbWF0ZUJhbGwodGFyZ2V0OiBWaWV3KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBhbmltYXRlQmFsbCcpO1xuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9ICF0aGlzLmJhbGxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuYmFsbFN0YXRlKVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MTAwfSxkdXJhdGlvbjoyMDAsY3VydmU6QW5pbWF0aW9uQ3VydmUuZWFzZUlufSkudGhlbigoKSA9PiB7aWYgKHRoaXMubG9hZGluZykgdGhpcy5hbmltYXRlQmFsbCh0YXJnZXQpfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MH0sZHVyYXRpb246NTAwLGN1cnZlOkFuaW1hdGlvbkN1cnZlLmVhc2VPdXR9KS50aGVuKCgpID0+IHtpZiAodGhpcy5sb2FkaW5nKSB0aGlzLmFuaW1hdGVCYWxsKHRhcmdldCl9KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3VzdG9tZXIgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgZ2V0Q3VzdG9tZXInKTtcbiAgICAgICAgdGhpcy5uZXQuZ2V0Q3VzdG9tZXIoe1xuICAgICAgICAgICAgX2lkOiB0aGlzLl9pZCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogKGRzQ3VzdG9tZXIpID0+IHRoaXMuc2hvd0N1c3RvbWVyKGRzQ3VzdG9tZXIpLFxuICAgICAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRpYWxvZy5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDb3VsZCBOb3QgRG93bmxvYWQgQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRW5zdXJlIHlvdXIgaGF2ZSBhIHN0cm9uZyBuZXR3b3JrIHNpZ25hbCBhbmQgc2lnbiBpbiBhZ2Fpbi4nLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPSydcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT50aGlzLnNob3dDdXN0b21lcnMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0N1c3RvbWVyIChkc0N1c3RvbWVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBzaG93Q3VzdG9tZXInLGRzQ3VzdG9tZXIpO1xuICAgICAgICB0aGlzLmRzQ3VzdG9tZXIgPSBkc0N1c3RvbWVyO1xuICAgICAgICB0aGlzLnRpdGxlID0gZHNDdXN0b21lci5OYW1lO1xuICAgICAgICB0aGlzLmdldE9yZGVycyhkc0N1c3RvbWVyLkN1c3ROdW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3JkZXJzIChDdXN0TnVtKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBnZXRPcmRlcnMnLEN1c3ROdW0pO1xuICAgICAgICB0aGlzLm5ldC5nZXRPcmRlcnMoe1xuICAgICAgICAgICAgQ3VzdE51bTogQ3VzdE51bSxcbiAgICAgICAgICAgIG9uU3VjY2VzczogKGRzT3JkZXIpID0+IHRoaXMuc2hvd09yZGVycyhkc09yZGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd09yZGVycyAoZHNPcmRlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgc2hvd09yZGVycycsZHNPcmRlci5sZW5ndGgpO1xuICAgICAgICB0aGlzLmRzT3JkZXIgPSBkc09yZGVyO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dPcmRlciAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgc2hvd09yZGVyJyxlLmluZGV4KTtcbi8vICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlciddLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDdXN0b21lcnMgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgc2hvd0N1c3RvbWVycycpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jdXN0b21lcnMnLHRoaXMuUmVwTmFtZV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cbn0iXX0=