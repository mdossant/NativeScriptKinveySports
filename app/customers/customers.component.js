"use strict";
// app: Sports
// class: customers
// purpose: download and show customers
// author: mauricio dos santos
// date: january 12 2019
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../common/app");
var net_1 = require("../common/net");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialog = require("tns-core-modules/ui/dialogs");
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(app, net, page, router, screen) {
        this.app = app;
        this.net = net;
        this.page = page;
        this.router = router;
        this.screen = screen;
        this.exitIcon = String.fromCharCode(0xea14);
        this.sortIcon = String.fromCharCode(0xea48);
        this.dsCustomer = [];
        this.sortByName = false;
    }
    CustomersComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('customers ngOnInit');
        this.app.loading = true;
        this.RepName = this.screen.snapshot.params['RepName'];
        this.title = 'Loading customers...';
        setTimeout(function () { return _this.getCustomers(false); }, 50);
    };
    CustomersComponent.prototype.getCustomers = function (loadMoreItems) {
        var _this = this;
        console.log('customers getCustomers');
        this.net.getCustomers({
            loadMoreItems: loadMoreItems,
            sortField: (this.sortByName) ? 'Name' : 'CustNum',
            onSuccess: function (dsCustomer) { return _this.showCustomers(dsCustomer); },
            onError: function () {
                _this.app.loading = false;
                dialog.confirm({
                    title: 'Could Not Download Customers',
                    message: 'Ensure your have a strong network signal and sign in again.',
                    okButtonText: 'OK'
                }).then(function () { return _this.signOut(); });
            }
        });
    };
    CustomersComponent.prototype.showCustomers = function (dsCustomer) {
        console.log('customers showCustomers', dsCustomer.length);
        this.title = this.RepName;
        for (var i = 0; i < dsCustomer.length; i++)
            this.dsCustomer.push(dsCustomer[i]);
        this.app.loading = false;
    };
    CustomersComponent.prototype.loadMoreItems = function () {
        console.log('customers loadMoreItems');
        this.getCustomers(true);
    };
    CustomersComponent.prototype.changeSort = function () {
        console.log('customers changeSort');
        this.sortByName = !this.sortByName;
        this.dsCustomer = [];
        this.getCustomers(false);
    };
    CustomersComponent.prototype.showCustomer = function (e) {
        console.log('customers showCustomer', e.index);
        this.router.navigate(['/customer', this.RepName, this.dsCustomer[e.index]._id], { clearHistory: true, transition: { name: 'fade' } });
    };
    CustomersComponent.prototype.showOrders = function (e) {
        console.log('customers showOrders', e.index);
        this.router.navigate(['/orders', this.RepName, this.dsCustomer[e.index].CustNum, this.dsCustomer[e.index].Name], { clearHistory: true, transition: { name: 'fade' } });
    };
    CustomersComponent.prototype.signOut = function () {
        console.log('customers signOut');
        this.router.navigate(['/'], { clearHistory: true, transition: { name: 'fade' } });
    };
    CustomersComponent = __decorate([
        core_1.Component({
            selector: 'ns-customers',
            moduleId: module.id,
            templateUrl: './customers.component.html',
        }),
        __metadata("design:paramtypes", [app_1.app, net_1.net, page_1.Page, router_1.RouterExtensions, router_2.ActivatedRoute])
    ], CustomersComponent);
    return CustomersComponent;
}());
exports.CustomersComponent = CustomersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkIsdUNBQXVDO0FBQ3ZDLDhCQUE4QjtBQUM5Qix3QkFBd0I7O0FBRXhCLHFDQUFvQztBQUNwQyxxQ0FBb0M7QUFDcEMsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwQ0FBaUQ7QUFDakQsaURBQWdEO0FBQ2hELG9EQUFzRDtBQVF0RDtJQVNJLDRCQUE0QixHQUFRLEVBQVUsR0FBUSxFQUFVLElBQVUsRUFBVSxNQUF3QixFQUFVLE1BQXNCO1FBQWhILFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFMcEksYUFBUSxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsYUFBUSxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsZUFBVSxHQUFlLEVBQUUsQ0FBQztRQUM1QixlQUFVLEdBQVksS0FBSyxDQUFDO0lBRTJHLENBQUM7SUFFaEoscUNBQVEsR0FBUjtRQUFBLGlCQU1DO1FBTEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxjQUFJLE9BQUEsS0FBSSxD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LENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQy9KLENBQUM7SUFFTyxvQ0FBTyxHQUFmO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQXRFUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1NBQzVDLENBQUM7eUNBV21DLFNBQUcsRUFBZSxTQUFHLEVBQWdCLFdBQUksRUFBa0IseUJBQWdCLEVBQWtCLHVCQUFjO09BVG5JLGtCQUFrQixDQXVFOUI7SUFBRCx5QkFBQztDQUFBLEFBdkVELElBdUVDO0FBdkVZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcDogU3BvcnRzXG4vLyBjbGFzczogY3VzdG9tZXJzXG4vLyBwdXJwb3NlOiBkb3dubG9hZCBhbmQgc2hvdyBjdXN0b21lcnNcbi8vIGF1dGhvcjogbWF1cmljaW8gZG9zIHNhbnRvc1xuLy8gZGF0ZTogamFudWFyeSAxMiAyMDE5XG5cbmltcG9ydCB7IGFwcCB9IGZyb20gJy4uL2NvbW1vbi9hcHAnO1xuaW1wb3J0IHsgbmV0IH0gZnJvbSAnLi4vY29tbW9uL25ldCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlJztcbmltcG9ydCAqIGFzIGRpYWxvZyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25zLWN1c3RvbWVycycsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXJzLmNvbXBvbmVudC5odG1sJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSB0aXRsZTogU3RyaW5nO1xuICAgIHByaXZhdGUgUmVwTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgZXhpdEljb246IFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlYTE0KTtcbiAgICBwcml2YXRlIHNvcnRJY29uOiBTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZWE0OCk7XG4gICAgcHJpdmF0ZSBkc0N1c3RvbWVyOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJpdmF0ZSBzb3J0QnlOYW1lOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHByaXZhdGUgYXBwOiBhcHAsIHByaXZhdGUgbmV0OiBuZXQsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgc2NyZWVuOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXJzIG5nT25Jbml0Jyk7XG4gICAgICAgIHRoaXMuYXBwLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLlJlcE5hbWUgPSB0aGlzLnNjcmVlbi5zbmFwc2hvdC5wYXJhbXNbJ1JlcE5hbWUnXTtcbiAgICAgICAgdGhpcy50aXRsZSA9ICdMb2FkaW5nIGN1c3RvbWVycy4uLic7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuZ2V0Q3VzdG9tZXJzKGZhbHNlKSw1MCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDdXN0b21lcnMgKGxvYWRNb3JlSXRlbXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVycyBnZXRDdXN0b21lcnMnKTtcbiAgICAgICAgdGhpcy5uZXQuZ2V0Q3VzdG9tZXJzKHtcbiAgICAgICAgICAgIGxvYWRNb3JlSXRlbXM6IGxvYWRNb3JlSXRlbXMsXG4gICAgICAgICAgICBzb3J0RmllbGQ6ICh0aGlzLnNvcnRCeU5hbWUpID8gJ05hbWUnIDogJ0N1c3ROdW0nLFxuICAgICAgICAgICAgb25TdWNjZXNzOiAoZHNDdXN0b21lcikgPT4gdGhpcy5zaG93Q3VzdG9tZXJzKGRzQ3VzdG9tZXIpLFxuICAgICAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ291bGQgTm90IERvd25sb2FkIEN1c3RvbWVycycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbnN1cmUgeW91ciBoYXZlIGEgc3Ryb25nIG5ldHdvcmsgc2lnbmFsIGFuZCBzaWduIGluIGFnYWluLicsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09LJ1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCk9PnRoaXMuc2lnbk91dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Q3VzdG9tZXJzIChkc0N1c3RvbWVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgc2hvd0N1c3RvbWVycycsZHNDdXN0b21lci5sZW5ndGgpO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5SZXBOYW1lO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8ZHNDdXN0b21lci5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgdGhpcy5kc0N1c3RvbWVyLnB1c2goZHNDdXN0b21lcltpXSk7XG4gICAgICAgIHRoaXMuYXBwLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRNb3JlSXRlbXMgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXJzIGxvYWRNb3JlSXRlbXMnKTtcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lcnModHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VTb3J0ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVycyBjaGFuZ2VTb3J0Jyk7XG4gICAgICAgIHRoaXMuc29ydEJ5TmFtZSA9ICF0aGlzLnNvcnRCeU5hbWU7XG4gICAgICAgIHRoaXMuZHNDdXN0b21lciA9IFtdO1xuICAgICAgICB0aGlzLmdldEN1c3RvbWVycyhmYWxzZSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDdXN0b21lciAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXJzIHNob3dDdXN0b21lcicsZS5pbmRleCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2N1c3RvbWVyJyx0aGlzLlJlcE5hbWUsdGhpcy5kc0N1c3RvbWVyW2UuaW5kZXhdLl9pZF0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd09yZGVycyAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXJzIHNob3dPcmRlcnMnLGUuaW5kZXgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcnMnLHRoaXMuUmVwTmFtZSx0aGlzLmRzQ3VzdG9tZXJbZS5pbmRleF0uQ3VzdE51bSx0aGlzLmRzQ3VzdG9tZXJbZS5pbmRleF0uTmFtZV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2lnbk91dCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgc2lnbk91dCcpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxufSJdfQ==