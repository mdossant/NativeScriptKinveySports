"use strict";
// app: sports
// class: signin
// purpose: sign in to application
// author: mauricio dos santos
// date: january 12 2019
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../common/app");
var net_1 = require("../common/net");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialog = require("tns-core-modules/ui/dialogs");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(app, net, page, router) {
        this.app = app;
        this.net = net;
        this.page = page;
        this.router = router;
        this.resetIcon = String.fromCharCode(0xe964);
        this.btnEnabled = false;
        this.fieldsEnabled = true;
        console.log('signin constructor');
        this.appVersion = 'version ' + this.app.props.version;
        this.appDate = 'as of ' + this.app.props.date;
    }
    SigninComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('signin ngOnInit');
        // application.android.off(application.AndroidApplication.activityBackPressedEvent);
        // application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => args.cancel = true);
        this.btnText = 'SIGN IN';
        this.userName = this.page.getViewById('userName');
        this.password = this.page.getViewById('password');
        this.userName.text = 'RDR';
        this.password.text = 'rdr';
        setTimeout(function () { return _this.userName.focus(); }, 100);
        //        this.router.navigate(['/customers'],{clearHistory:true,transition:{name:'fade'}});
        //        this.router.navigate(['/customer',1],{clearHistory:true,transition:{name:'fade'}});
        //        this.router.navigate(['/orders',1],{clearHistory:true,transition:{name:'fade'}});
        //        this.router.navigate(['/order',1,1],{clearHistory:true,transition:{name:'fade'}});
        //        this.router.navigate(['/shop',1],{clearHistory:true,transition:{name:'fade'}});
        //        this.router.navigate(['/item',1,1,'',1,'2'],{clearHistory:true,transition:{name:'fade'}});
    };
    SigninComponent.prototype.enableSignin = function () {
        var _this = this;
        console.log('signin enableSignin');
        this.btnText = 'SIGN IN';
        this.btnEnabled = true;
        this.fieldsEnabled = true;
        setTimeout(function () { return _this.userName.focus(); }, 100);
    };
    SigninComponent.prototype.newUsername = function () {
        console.log('signin newUsername');
        this.btnEnabled = (this.userName.text != undefined && this.userName.text != '' && this.password.text != undefined && this.password.text != '');
    };
    SigninComponent.prototype.newPassword = function () {
        console.log('signin newPassword');
        this.btnEnabled = (this.userName.text != undefined && this.userName.text != '' && this.password.text != undefined && this.password.text != '');
    };
    SigninComponent.prototype.signinSuccess = function (RepName) {
        console.log('signin signinSuccess', RepName);
        this.router.navigate(['/customers', RepName], { clearHistory: true, transition: { name: 'fade' } });
    };
    SigninComponent.prototype.signinFail = function () {
        var _this = this;
        console.log('signin signinFail');
        dialog.confirm({
            title: 'Sign In Failed',
            message: 'Ensure your have a strong network signal and entered a valid username and password.',
            okButtonText: 'OK'
        }).then(function () { return _this.enableSignin(); });
    };
    SigninComponent.prototype.signin = function () {
        var _this = this;
        console.log('signin signin', this.userName.text, this.password.text);
        this.btnText = 'Signing in...';
        this.btnEnabled = false;
        this.fieldsEnabled = false;
        this.userName.dismissSoftInput();
        this.password.dismissSoftInput();
        this.net.authenticate({
            userName: this.userName.text,
            password: this.password.text,
            onSuccess: function (RepName) {
                setTimeout(function () { return _this.signinSuccess(RepName); }, 50);
            },
            onError: function () {
                setTimeout(function () { return _this.signinFail(); }, 50);
            }
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'ns-signin',
            moduleId: module.id,
            templateUrl: './signin.component.html',
        }),
        __metadata("design:paramtypes", [app_1.app, net_1.net, page_1.Page, router_1.RouterExtensions])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25pbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsa0NBQWtDO0FBQ2xDLDhCQUE4QjtBQUM5Qix3QkFBd0I7O0FBRXhCLHFDQUFvQztBQUNwQyxxQ0FBb0M7QUFDcEMsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCxpREFBZ0Q7QUFFaEQsb0RBQXNEO0FBU3REO0lBNEJJLHlCQUE0QixHQUFRLEVBQVUsR0FBUSxFQUFVLElBQVUsRUFBVSxNQUF3QjtRQUFoRixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQTNCcEcsY0FBUyxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFNaEQsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQXFCbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQXRCRCxrQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLG9GQUFvRjtRQUNwRixzSEFBc0g7UUFDdEgsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBZSxJQUFJLENBQUMsSUFBSSxD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SSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7WUFDNUIsU0FBUyxFQUFFLFVBQUMsT0FBTztnQkFDZixVQUFVLENBQUMsY0FBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQTNCLENBQTJCLEVBQUMsRUFBRSxDQUFDLENBQUE7WUFDbEQsQ0FBQztZQUNELE9BQU8sRUFBRTtnQkFDTCxVQUFVLENBQUMsY0FBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxFQUFFLENBQUMsQ0FBQTtZQUN4QyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5GUSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtTQUN6QyxDQUFDO3lDQThCbUMsU0FBRyxFQUFlLFNBQUcsRUFBZ0IsV0FBSSxFQUFrQix5QkFBZ0I7T0E1Qm5HLGVBQWUsQ0FvRjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXBGRCxJQW9GQztBQXBGWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcDogc3BvcnRzXG4vLyBjbGFzczogc2lnbmluXG4vLyBwdXJwb3NlOiBzaWduIGluIHRvIGFwcGxpY2F0aW9uXG4vLyBhdXRob3I6IG1hdXJpY2lvIGRvcyBzYW50b3Ncbi8vIGRhdGU6IGphbnVhcnkgMTIgMjAxOVxuXG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuLi9jb21tb24vYXBwJztcbmltcG9ydCB7IG5ldCB9IGZyb20gJy4uL2NvbW1vbi9uZXQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQnO1xuaW1wb3J0ICogYXMgZGlhbG9nIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICducy1zaWduaW4nLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpZ25pbi5jb21wb25lbnQuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIHJlc2V0SWNvbjogU3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGU5NjQpO1xuICAgIHByaXZhdGUgYXBwVmVyc2lvbjogU3RyaW5nO1xuICAgIHByaXZhdGUgYXBwRGF0ZTogU3RyaW5nO1xuICAgIHByaXZhdGUgdXNlck5hbWU6IFRleHRGaWVsZDtcbiAgICBwcml2YXRlIHBhc3N3b3JkOiBUZXh0RmllbGQ7XG4gICAgcHJpdmF0ZSBidG5UZXh0OiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBidG5FbmFibGVkOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBmaWVsZHNFbmFibGVkOiBCb29sZWFuID0gdHJ1ZTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIG5nT25Jbml0Jyk7XG4gICAgICAgIC8vIGFwcGxpY2F0aW9uLmFuZHJvaWQub2ZmKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQpO1xuICAgICAgICAvLyBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChhcmdzOiBhbnkpID0+IGFyZ3MuY2FuY2VsID0gdHJ1ZSk7XG4gICAgICAgIHRoaXMuYnRuVGV4dCA9ICdTSUdOIElOJztcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IDxUZXh0RmllbGQ+IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgndXNlck5hbWUnKTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IDxUZXh0RmllbGQ+IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGFzc3dvcmQnKTtcbiAgICAgICAgdGhpcy51c2VyTmFtZS50ZXh0ID0gJ1JEUic7XG4gICAgICAgIHRoaXMucGFzc3dvcmQudGV4dCA9ICdyZHInO1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLnVzZXJOYW1lLmZvY3VzKCksMTAwKTtcbi8vICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jdXN0b21lcnMnXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4vLyAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3VzdG9tZXInLDFdLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbi8vICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcnMnLDFdLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbi8vICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcicsMSwxXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4vLyAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2hvcCcsMV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuLy8gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2l0ZW0nLDEsMSwnJywxLCcyJ10se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAocHJpdmF0ZSBhcHA6IGFwcCwgcHJpdmF0ZSBuZXQ6IG5ldCwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIGNvbnN0cnVjdG9yJyk7XG4gICAgICAgIHRoaXMuYXBwVmVyc2lvbiA9ICd2ZXJzaW9uICcgKyB0aGlzLmFwcC5wcm9wcy52ZXJzaW9uO1xuICAgICAgICB0aGlzLmFwcERhdGUgPSAnYXMgb2YgJyArIHRoaXMuYXBwLnByb3BzLmRhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmFibGVTaWduaW4gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIGVuYWJsZVNpZ25pbicpO1xuICAgICAgICB0aGlzLmJ0blRleHQgPSAnU0lHTiBJTic7XG4gICAgICAgIHRoaXMuYnRuRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZmllbGRzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMudXNlck5hbWUuZm9jdXMoKSwxMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgbmV3VXNlcm5hbWUgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIG5ld1VzZXJuYW1lJyk7XG4gICAgICAgIHRoaXMuYnRuRW5hYmxlZCA9ICh0aGlzLnVzZXJOYW1lLnRleHQgIT0gdW5kZWZpbmVkICYmIHRoaXMudXNlck5hbWUudGV4dCAhPSAnJyAmJiB0aGlzLnBhc3N3b3JkLnRleHQgIT0gdW5kZWZpbmVkICYmIHRoaXMucGFzc3dvcmQudGV4dCAhPSAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBuZXdQYXNzd29yZCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduaW4gbmV3UGFzc3dvcmQnKTtcbiAgICAgICAgdGhpcy5idG5FbmFibGVkID0gKHRoaXMudXNlck5hbWUudGV4dCAhPSB1bmRlZmluZWQgJiYgdGhpcy51c2VyTmFtZS50ZXh0ICE9ICcnICYmIHRoaXMucGFzc3dvcmQudGV4dCAhPSB1bmRlZmluZWQgJiYgdGhpcy5wYXNzd29yZC50ZXh0ICE9ICcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNpZ25pblN1Y2Nlc3MgKFJlcE5hbWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ25pbiBzaWduaW5TdWNjZXNzJyxSZXBOYW1lKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3VzdG9tZXJzJyxSZXBOYW1lXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaWduaW5GYWlsICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ25pbiBzaWduaW5GYWlsJyk7XG4gICAgICAgIGRpYWxvZy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiAnU2lnbiBJbiBGYWlsZWQnLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0Vuc3VyZSB5b3VyIGhhdmUgYSBzdHJvbmcgbmV0d29yayBzaWduYWwgYW5kIGVudGVyZWQgYSB2YWxpZCB1c2VybmFtZSBhbmQgcGFzc3dvcmQuJyxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09LJ1xuICAgICAgICB9KS50aGVuKCgpPT50aGlzLmVuYWJsZVNpZ25pbigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNpZ25pbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduaW4gc2lnbmluJyx0aGlzLnVzZXJOYW1lLnRleHQsdGhpcy5wYXNzd29yZC50ZXh0KTtcbiAgICAgICAgdGhpcy5idG5UZXh0ID0gJ1NpZ25pbmcgaW4uLi4nO1xuICAgICAgICB0aGlzLmJ0bkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5maWVsZHNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXNlck5hbWUuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICB0aGlzLnBhc3N3b3JkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgdGhpcy5uZXQuYXV0aGVudGljYXRlKHtcbiAgICAgICAgICAgIHVzZXJOYW1lOiB0aGlzLnVzZXJOYW1lLnRleHQsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZC50ZXh0LFxuICAgICAgICAgICAgb25TdWNjZXNzOiAoUmVwTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuc2lnbmluU3VjY2VzcyhSZXBOYW1lKSw1MClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5zaWduaW5GYWlsKCksNTApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=