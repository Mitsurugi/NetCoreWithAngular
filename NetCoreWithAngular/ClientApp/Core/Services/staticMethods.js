import { HttpParams } from '@angular/common/http';
var StaticMethods = /** @class */ (function () {
    function StaticMethods() {
    }
    StaticMethods.ObjectToUrlParams = function (parameterName, object) {
        var result = '';
        Object.keys(object).forEach(function (i) {
            var value = object[i];
            if (value)
                result += parameterName + '.' + i + '=' + object[i] + '&';
        });
        return result;
    };
    StaticMethods.ObjectToHttpParams = function (parameterName, object) {
        var result = new HttpParams();
        Object.keys(object).forEach(function (i) {
            var value = object[i];
            if (value)
                result = result.append(parameterName + '.' + i, value);
        });
        return result;
    };
    return StaticMethods;
}());
export { StaticMethods };
//# sourceMappingURL=staticMethods.js.map