"use strict";
// app: ULFPod
// class: app
// purpose: general methods and app properties
// author: mauricio dos santos
// date: may 11 2018
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = /** @class */ (function () {
    function app() {
        this.props = {
            appKey: 'kid_B1fDHsXzN',
            appSecret: 'ece2258ff70f4cc8934f5dad8913d880',
            limit: 25,
            //        protocol: 'https://',
            //        domain: '10.0.2.16', /* DEV */
            //        rest: '/api/rest/si/',
            //        env: 'DEV',
            version: '0-0-0',
            date: 'January 12, 2019'
        };
    }
    app.prototype.getProperty = function (property) {
        // console.log('app getProperty',property);
        return this.props[property];
    };
    app = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], app);
    return app;
}());
exports.app = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsYUFBYTtBQUNiLDhDQUE4QztBQUM5Qyw4QkFBOEI7QUFDOUIsb0JBQW9COztBQUVwQixzQ0FBMkM7QUFJM0M7SUFjSTtRQVpPLFVBQUssR0FBRztZQUNYLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLFNBQVMsRUFBRSxrQ0FBa0M7WUFDN0MsS0FBSyxFQUFFLEVBQUU7WUFDakIsK0JBQStCO1lBQy9CLHdDQUF3QztZQUN4QyxnQ0FBZ0M7WUFDaEMscUJBQXFCO1lBQ2IsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLGtCQUFrQjtTQUMzQixDQUFBO0lBRXNCLENBQUM7SUFFakIseUJBQVcsR0FBbEIsVUFBb0IsUUFBUTtRQUN4QiwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQW5CUSxHQUFHO1FBRmYsaUJBQVUsRUFBRTs7T0FFQSxHQUFHLENBb0JmO0lBQUQsVUFBQztDQUFBLEFBcEJELElBb0JDO0FBcEJZLGtCQUFHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwOiBVTEZQb2Rcbi8vIGNsYXNzOiBhcHBcbi8vIHB1cnBvc2U6IGdlbmVyYWwgbWV0aG9kcyBhbmQgYXBwIHByb3BlcnRpZXNcbi8vIGF1dGhvcjogbWF1cmljaW8gZG9zIHNhbnRvc1xuLy8gZGF0ZTogbWF5IDExIDIwMThcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIGFwcCB7XG5cbiAgICBwdWJsaWMgcHJvcHMgPSB7XG4gICAgICAgIGFwcEtleTogJ2tpZF9CMWZESHNYek4nLFxuICAgICAgICBhcHBTZWNyZXQ6ICdlY2UyMjU4ZmY3MGY0Y2M4OTM0ZjVkYWQ4OTEzZDg4MCcsXG4gICAgICAgIGxpbWl0OiAyNSxcbi8vICAgICAgICBwcm90b2NvbDogJ2h0dHBzOi8vJyxcbi8vICAgICAgICBkb21haW46ICcxMC4wLjIuMTYnLCAvKiBERVYgKi9cbi8vICAgICAgICByZXN0OiAnL2FwaS9yZXN0L3NpLycsXG4vLyAgICAgICAgZW52OiAnREVWJyxcbiAgICAgICAgdmVyc2lvbjogJzAtMC0wJyxcbiAgICAgICAgZGF0ZTogJ0phbnVhcnkgMTIsIDIwMTknXG4gICAgfVxuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICgpIHt9XG5cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHkgKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdhcHAgZ2V0UHJvcGVydHknLHByb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNbcHJvcGVydHldO1xuICAgIH1cbn0iXX0=