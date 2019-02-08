"use strict";
// app: sports
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
var enums_1 = require("tns-core-modules/ui/enums");
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
        this.loading = true;
        this.RepName = this.screen.snapshot.params['RepName'];
        this.title = 'Loading customers...';
        setTimeout(function () { return _this.getCustomers(false); }, 50);
    };
    CustomersComponent.prototype.animateBall = function (target) {
        var _this = this;
        console.log('customers animateBall');
        this.ballState = !this.ballState;
        if (this.ballState)
            target.animate({ translate: { x: 0, y: 100 }, duration: 200, curve: enums_1.AnimationCurve.easeIn }).then(function () { if (_this.loading)
                _this.animateBall(target); });
        else
            target.animate({ translate: { x: 0, y: 0 }, duration: 500, curve: enums_1.AnimationCurve.easeOut }).then(function () { if (_this.loading)
                _this.animateBall(target); });
    };
    CustomersComponent.prototype.getCustomers = function (loadMoreItems) {
        var _this = this;
        console.log('customers getCustomers');
        this.net.getCustomers({
            loadMoreItems: loadMoreItems,
            sortField: (this.sortByName) ? 'Name' : 'CustNum',
            onSuccess: function (dsCustomer) { return _this.showCustomers(dsCustomer); },
            onError: function () {
                _this.loading = false;
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
        this.loading = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkIsdUNBQXVDO0FBQ3ZDLDhCQUE4QjtBQUM5Qix3QkFBd0I7O0FBRXhCLHFDQUFvQztBQUNwQyxxQ0FBb0M7QUFDcEMsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwQ0FBaUQ7QUFDakQsaURBQWdEO0FBRWhELG1EQUF5RDtBQUN6RCxvREFBc0Q7QUFRdEQ7SUFXSSw0QkFBNEIsR0FBUSxFQUFVLEdBQVEsRUFBVSxJQUFVLEVBQVUsTUFBd0IsRUFBVSxNQUFzQjtRQUFoSCxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTHBJLGFBQVEsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLGFBQVEsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLGVBQVUsR0FBZSxFQUFFLENBQUM7UUFDNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztJQUUyRyxDQUFDO0lBRWhKLHFDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxjQUFJLE9BQUEsS0FB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QUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBakZRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7U0FDNUMsQ0FBQzt5Q0FhbUMsU0FBRyxFQUFlLFNBQUcsRUFBZ0IsV0FBSSxFQUFrQix5QkFBZ0IsRUFBa0IsdUJBQWM7T0FYbkksa0JBQWtCLENBa0Y5QjtJQUFELHlCQUFDO0NBQUEsQUFsRkQsSUFrRkM7QUFsRlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwOiBzcG9ydHNcbi8vIGNsYXNzOiBjdXN0b21lcnNcbi8vIHB1cnBvc2U6IGRvd25sb2FkIGFuZCBzaG93IGN1c3RvbWVyc1xuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDEyIDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3JztcbmltcG9ydCB7QW5pbWF0aW9uQ3VydmV9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtY3VzdG9tZXJzJyxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lcnMuY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGxvYWRpbmc6IEJvb2xlYW47XG4gICAgcHJpdmF0ZSBiYWxsU3RhdGU6IEJvb2xlYW47XG4gICAgcHJpdmF0ZSB0aXRsZTogU3RyaW5nO1xuICAgIHByaXZhdGUgUmVwTmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgZXhpdEljb246IFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlYTE0KTtcbiAgICBwcml2YXRlIHNvcnRJY29uOiBTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZWE0OCk7XG4gICAgcHJpdmF0ZSBkc0N1c3RvbWVyOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJpdmF0ZSBzb3J0QnlOYW1lOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHByaXZhdGUgYXBwOiBhcHAsIHByaXZhdGUgbmV0OiBuZXQsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgc2NyZWVuOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXJzIG5nT25Jbml0Jyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuUmVwTmFtZSA9IHRoaXMuc2NyZWVuLnNuYXBzaG90LnBhcmFtc1snUmVwTmFtZSddO1xuICAgICAgICB0aGlzLnRpdGxlID0gJ0xvYWRpbmcgY3VzdG9tZXJzLi4uJztcbiAgICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5nZXRDdXN0b21lcnMoZmFsc2UpLDUwKTtcbiAgICB9XG5cbiAgICBhbmltYXRlQmFsbCh0YXJnZXQ6IFZpZXcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVycyBhbmltYXRlQmFsbCcpO1xuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9ICF0aGlzLmJhbGxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuYmFsbFN0YXRlKVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MTAwfSxkdXJhdGlvbjoyMDAsY3VydmU6QW5pbWF0aW9uQ3VydmUuZWFzZUlufSkudGhlbigoKSA9PiB7aWYgKHRoaXMubG9hZGluZykgdGhpcy5hbmltYXRlQmFsbCh0YXJnZXQpfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MH0sZHVyYXRpb246NTAwLGN1cnZlOkFuaW1hdGlvbkN1cnZlLmVhc2VPdXR9KS50aGVuKCgpID0+IHtpZiAodGhpcy5sb2FkaW5nKSB0aGlzLmFuaW1hdGVCYWxsKHRhcmdldCl9KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3VzdG9tZXJzIChsb2FkTW9yZUl0ZW1zKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgZ2V0Q3VzdG9tZXJzJyk7XG4gICAgICAgIHRoaXMubmV0LmdldEN1c3RvbWVycyh7XG4gICAgICAgICAgICBsb2FkTW9yZUl0ZW1zOiBsb2FkTW9yZUl0ZW1zLFxuICAgICAgICAgICAgc29ydEZpZWxkOiAodGhpcy5zb3J0QnlOYW1lKSA/ICdOYW1lJyA6ICdDdXN0TnVtJyxcbiAgICAgICAgICAgIG9uU3VjY2VzczogKGRzQ3VzdG9tZXIpID0+IHRoaXMuc2hvd0N1c3RvbWVycyhkc0N1c3RvbWVyKSxcbiAgICAgICAgICAgIG9uRXJyb3I6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ291bGQgTm90IERvd25sb2FkIEN1c3RvbWVycycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbnN1cmUgeW91ciBoYXZlIGEgc3Ryb25nIG5ldHdvcmsgc2lnbmFsIGFuZCBzaWduIGluIGFnYWluLicsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09LJ1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCk9PnRoaXMuc2lnbk91dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Q3VzdG9tZXJzIChkc0N1c3RvbWVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgc2hvd0N1c3RvbWVycycsZHNDdXN0b21lci5sZW5ndGgpO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5SZXBOYW1lO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8ZHNDdXN0b21lci5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgdGhpcy5kc0N1c3RvbWVyLnB1c2goZHNDdXN0b21lcltpXSk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZE1vcmVJdGVtcyAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgbG9hZE1vcmVJdGVtcycpO1xuICAgICAgICB0aGlzLmdldEN1c3RvbWVycyh0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVNvcnQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXJzIGNoYW5nZVNvcnQnKTtcbiAgICAgICAgdGhpcy5zb3J0QnlOYW1lID0gIXRoaXMuc29ydEJ5TmFtZTtcbiAgICAgICAgdGhpcy5kc0N1c3RvbWVyID0gW107XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKGZhbHNlKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0N1c3RvbWVyIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgc2hvd0N1c3RvbWVyJyxlLmluZGV4KTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3VzdG9tZXInLHRoaXMuUmVwTmFtZSx0aGlzLmRzQ3VzdG9tZXJbZS5pbmRleF0uX2lkXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93T3JkZXJzIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lcnMgc2hvd09yZGVycycsZS5pbmRleCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL29yZGVycycsdGhpcy5SZXBOYW1lLHRoaXMuZHNDdXN0b21lcltlLmluZGV4XS5DdXN0TnVtLHRoaXMuZHNDdXN0b21lcltlLmluZGV4XS5OYW1lXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaWduT3V0ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVycyBzaWduT3V0Jyk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbiAgICB9XG59Il19