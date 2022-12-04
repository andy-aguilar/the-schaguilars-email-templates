"use strict";
exports.__esModule = true;
exports.BaseConverter = void 0;
var BaseConverter = /** @class */ (function () {
    function BaseConverter() {
        var _this = this;
        this.convertAll = function (ts) {
            return ts.map(_this.doForward);
        };
        this.reverseAll = function (us) {
            return us.map(_this.doBackward);
        };
    }
    return BaseConverter;
}());
exports.BaseConverter = BaseConverter;
