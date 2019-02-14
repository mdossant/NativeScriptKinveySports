"use strict";
// app: Sports
// class: app
// purpose: general methods and app properties
// author: mauricio dos santos
// date: may 11 2018
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("tns-core-modules/ui/enums");
var app = /** @class */ (function () {
    function app() {
        this.props = {
            appKey: 'kid_B1fDHsXzN',
            appSecret: 'ece2258ff70f4cc8934f5dad8913d880',
            limit: 25,
            version: '0-0-0',
            date: 'January 12, 2019'
        };
    }
    app.prototype.animateLoading = function (target) {
        var _this = this;
        console.log('app animateLoading');
        this.loadingState = !this.loadingState;
        if (this.loadingState)
            target.animate({ translate: { x: 0, y: 100 }, duration: 200, curve: enums_1.AnimationCurve.easeIn }).then(function () { if (_this.loading)
                _this.animateLoading(target); });
        else
            target.animate({ translate: { x: 0, y: 0 }, duration: 500, curve: enums_1.AnimationCurve.easeOut }).then(function () { if (_this.loading)
                _this.animateLoading(target); });
    };
    app.prototype.getProperty = function (property) {
        console.log('app getProperty', property);
        return this.props[property];
    };
    app = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], app);
    return app;
}());
exports.app = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsYUFBYTtBQUNiLDhDQUE4QztBQUM5Qyw4QkFBOEI7QUFDOUIsb0JBQW9COztBQUVwQixzQ0FBMkM7QUFDM0MsbURBQXlEO0FBSXpEO0lBWUk7UUFWTyxVQUFLLEdBQUc7WUFDWCxNQUFNLEVBQUUsZUFBZTtZQUN2QixTQUFTLEVBQUUsa0NBQWtDO1lBQzdDLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLGtCQUFrQjtTQUMzQixDQUFBO0lBSXNCLENBQUM7SUFFaEIsNEJBQWMsR0FBdEIsVUFBdUIsTUFBTTtRQUE3QixpQkFPQztRQU5HLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxzQkFBYyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU8sRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFBQyxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUE7UUFDaEosSUFBSTtZQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxzQkFBYyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU8sRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFBQyxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDbkosQ0FBQztJQUVNLHlCQUFXLEdBQWxCLFVBQW9CLFFBQVE7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBMUJRLEdBQUc7UUFGZixpQkFBVSxFQUFFOztPQUVBLEdBQUcsQ0EyQmY7SUFBRCxVQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHA6IFNwb3J0c1xuLy8gY2xhc3M6IGFwcFxuLy8gcHVycG9zZTogZ2VuZXJhbCBtZXRob2RzIGFuZCBhcHAgcHJvcGVydGllc1xuLy8gYXV0aG9yOiBtYXVyaWNpbyBkb3Mgc2FudG9zXG4vLyBkYXRlOiBtYXkgMTEgMjAxOFxuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QW5pbWF0aW9uQ3VydmV9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBhcHAge1xuXG4gICAgcHVibGljIHByb3BzID0ge1xuICAgICAgICBhcHBLZXk6ICdraWRfQjFmREhzWHpOJyxcbiAgICAgICAgYXBwU2VjcmV0OiAnZWNlMjI1OGZmNzBmNGNjODkzNGY1ZGFkODkxM2Q4ODAnLFxuICAgICAgICBsaW1pdDogMjUsXG4gICAgICAgIHZlcnNpb246ICcwLTAtMCcsXG4gICAgICAgIGRhdGU6ICdKYW51YXJ5IDEyLCAyMDE5J1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZGluZzogQm9vbGVhbjtcbiAgICBwcml2YXRlIGxvYWRpbmdTdGF0ZTogQm9vbGVhbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7fVxuXG4gICAgcHJpdmF0ZSBhbmltYXRlTG9hZGluZyh0YXJnZXQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FwcCBhbmltYXRlTG9hZGluZycpO1xuICAgICAgICB0aGlzLmxvYWRpbmdTdGF0ZSA9ICF0aGlzLmxvYWRpbmdTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ1N0YXRlKVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MTAwfSxkdXJhdGlvbjoyMDAsY3VydmU6QW5pbWF0aW9uQ3VydmUuZWFzZUlufSkudGhlbigoKSA9PiB7aWYgKHRoaXMubG9hZGluZykgdGhpcy5hbmltYXRlTG9hZGluZyh0YXJnZXQpfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGUoe3RyYW5zbGF0ZTp7eDowLHk6MH0sZHVyYXRpb246NTAwLGN1cnZlOkFuaW1hdGlvbkN1cnZlLmVhc2VPdXR9KS50aGVuKCgpID0+IHtpZiAodGhpcy5sb2FkaW5nKSB0aGlzLmFuaW1hdGVMb2FkaW5nKHRhcmdldCl9KVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0UHJvcGVydHkgKHByb3BlcnR5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhcHAgZ2V0UHJvcGVydHknLHByb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNbcHJvcGVydHldO1xuICAgIH1cbn0iXX0=