"use strict";
// app: Sports
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
//import * as application from 'tns-core-modules/application';
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
        //application.android.off(application.AndroidApplication.activityBackPressedEvent);
        //application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => args.cancel = true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25pbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsa0NBQWtDO0FBQ2xDLDhCQUE4QjtBQUM5Qix3QkFBd0I7O0FBRXhCLHFDQUFvQztBQUNwQyxxQ0FBb0M7QUFDcEMsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCxpREFBZ0Q7QUFFaEQsb0RBQXNEO0FBQ3RELDhEQUE4RDtBQVE5RDtJQTRCSSx5QkFBNEIsR0FBUSxFQUFVLEdBQVEsRUFBVSxJQUFVLEVBQVUsTUFBd0I7UUFBaEYsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUEzQnBHLGNBQVMsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTWhELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFxQmxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2xELENBQUM7SUF0QkQsa0NBQVEsR0FBUjtRQUFBLGlCQWdCQztRQWZHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixtRkFBbUY7UUFDbkYscUhBQXFIO1FBQ3JILElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQWUsSUFB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QUFDO1FBQ25FLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7WUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtZQUM1QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQzVCLFNBQVMsRUFBRSxVQUFDLE9BQU87Z0JBQ2YsVUFBVSxDQUFDLGNBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUEzQixDQUEyQixFQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2xELENBQUM7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsVUFBVSxDQUFDLGNBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLEVBQUMsRUFBRSxDQUFDLENBQUE7WUFDeEMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuRlEsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7U0FDekMsQ0FBQzt5Q0E4Qm1DLFNBQUcsRUFBZSxTQUFHLEVBQWdCLFdBQUksRUFBa0IseUJBQWdCO09BNUJuRyxlQUFlLENBb0YzQjtJQUFELHNCQUFDO0NBQUEsQUFwRkQsSUFvRkM7QUFwRlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHA6IFNwb3J0c1xuLy8gY2xhc3M6IHNpZ25pblxuLy8gcHVycG9zZTogc2lnbiBpbiB0byBhcHBsaWNhdGlvblxuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBqYW51YXJ5IDEyIDIwMTlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vY29tbW9uL2FwcCc7XG5pbXBvcnQgeyBuZXQgfSBmcm9tICcuLi9jb21tb24vbmV0JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkJztcbmltcG9ydCAqIGFzIGRpYWxvZyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuLy9pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICducy1zaWduaW4nLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpZ25pbi5jb21wb25lbnQuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIHJlc2V0SWNvbjogU3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGU5NjQpO1xuICAgIHByaXZhdGUgYXBwVmVyc2lvbjogU3RyaW5nO1xuICAgIHByaXZhdGUgYXBwRGF0ZTogU3RyaW5nO1xuICAgIHByaXZhdGUgdXNlck5hbWU6IFRleHRGaWVsZDtcbiAgICBwcml2YXRlIHBhc3N3b3JkOiBUZXh0RmllbGQ7XG4gICAgcHJpdmF0ZSBidG5UZXh0OiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBidG5FbmFibGVkOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBmaWVsZHNFbmFibGVkOiBCb29sZWFuID0gdHJ1ZTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIG5nT25Jbml0Jyk7XG4gICAgICAgIC8vYXBwbGljYXRpb24uYW5kcm9pZC5vZmYoYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCk7XG4gICAgICAgIC8vYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiBhcmdzLmNhbmNlbCA9IHRydWUpO1xuICAgICAgICB0aGlzLmJ0blRleHQgPSAnU0lHTiBJTic7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSA8VGV4dEZpZWxkPiB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3VzZXJOYW1lJyk7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSA8VGV4dEZpZWxkPiB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3Bhc3N3b3JkJyk7XG4gICAgICAgIHRoaXMudXNlck5hbWUudGV4dCA9ICdSRFInO1xuICAgICAgICB0aGlzLnBhc3N3b3JkLnRleHQgPSAncmRyJztcbiAgICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy51c2VyTmFtZS5mb2N1cygpLDEwMCk7XG4vLyAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3VzdG9tZXJzJ10se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuLy8gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2N1c3RvbWVyJywxXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4vLyAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3JkZXJzJywxXSx7Y2xlYXJIaXN0b3J5OnRydWUsdHJhbnNpdGlvbjp7bmFtZTonZmFkZSd9fSk7XG4vLyAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3JkZXInLDEsMV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuLy8gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Nob3AnLDFdLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbi8vICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9pdGVtJywxLDEsJycsMSwnMiddLHtjbGVhckhpc3Rvcnk6dHJ1ZSx0cmFuc2l0aW9uOntuYW1lOidmYWRlJ319KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHByaXZhdGUgYXBwOiBhcHAsIHByaXZhdGUgbmV0OiBuZXQsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ25pbiBjb25zdHJ1Y3RvcicpO1xuICAgICAgICB0aGlzLmFwcFZlcnNpb24gPSAndmVyc2lvbiAnICsgdGhpcy5hcHAucHJvcHMudmVyc2lvbjtcbiAgICAgICAgdGhpcy5hcHBEYXRlID0gJ2FzIG9mICcgKyB0aGlzLmFwcC5wcm9wcy5kYXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5hYmxlU2lnbmluICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ25pbiBlbmFibGVTaWduaW4nKTtcbiAgICAgICAgdGhpcy5idG5UZXh0ID0gJ1NJR04gSU4nO1xuICAgICAgICB0aGlzLmJ0bkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZpZWxkc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLnVzZXJOYW1lLmZvY3VzKCksMTAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5ld1VzZXJuYW1lICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ25pbiBuZXdVc2VybmFtZScpO1xuICAgICAgICB0aGlzLmJ0bkVuYWJsZWQgPSAodGhpcy51c2VyTmFtZS50ZXh0ICE9IHVuZGVmaW5lZCAmJiB0aGlzLnVzZXJOYW1lLnRleHQgIT0gJycgJiYgdGhpcy5wYXNzd29yZC50ZXh0ICE9IHVuZGVmaW5lZCAmJiB0aGlzLnBhc3N3b3JkLnRleHQgIT0gJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbmV3UGFzc3dvcmQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIG5ld1Bhc3N3b3JkJyk7XG4gICAgICAgIHRoaXMuYnRuRW5hYmxlZCA9ICh0aGlzLnVzZXJOYW1lLnRleHQgIT0gdW5kZWZpbmVkICYmIHRoaXMudXNlck5hbWUudGV4dCAhPSAnJyAmJiB0aGlzLnBhc3N3b3JkLnRleHQgIT0gdW5kZWZpbmVkICYmIHRoaXMucGFzc3dvcmQudGV4dCAhPSAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaWduaW5TdWNjZXNzIChSZXBOYW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduaW4gc2lnbmluU3VjY2VzcycsUmVwTmFtZSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2N1c3RvbWVycycsUmVwTmFtZV0se2NsZWFySGlzdG9yeTp0cnVlLHRyYW5zaXRpb246e25hbWU6J2ZhZGUnfX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2lnbmluRmFpbCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduaW4gc2lnbmluRmFpbCcpO1xuICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ1NpZ24gSW4gRmFpbGVkJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFbnN1cmUgeW91ciBoYXZlIGEgc3Ryb25nIG5ldHdvcmsgc2lnbmFsIGFuZCBlbnRlcmVkIGEgdmFsaWQgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLicsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPSydcbiAgICAgICAgfSkudGhlbigoKT0+dGhpcy5lbmFibGVTaWduaW4oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaWduaW4gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbmluIHNpZ25pbicsdGhpcy51c2VyTmFtZS50ZXh0LHRoaXMucGFzc3dvcmQudGV4dCk7XG4gICAgICAgIHRoaXMuYnRuVGV4dCA9ICdTaWduaW5nIGluLi4uJztcbiAgICAgICAgdGhpcy5idG5FbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmllbGRzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVzZXJOYW1lLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgdGhpcy5wYXNzd29yZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIHRoaXMubmV0LmF1dGhlbnRpY2F0ZSh7XG4gICAgICAgICAgICB1c2VyTmFtZTogdGhpcy51c2VyTmFtZS50ZXh0LFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQudGV4dCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogKFJlcE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLnNpZ25pblN1Y2Nlc3MoUmVwTmFtZSksNTApXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuc2lnbmluRmFpbCgpLDUwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il19