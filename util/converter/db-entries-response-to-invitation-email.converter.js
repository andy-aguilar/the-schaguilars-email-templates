"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DBAllEntriesResponseToInvitationEmailConverter = exports.DBAllEntriesResponseToInvitationEmail = void 0;
var base_converter_class_1 = require("./base-converter.class");
var DBAllEntriesResponseToInvitationEmail = /** @class */ (function (_super) {
    __extends(DBAllEntriesResponseToInvitationEmail, _super);
    function DBAllEntriesResponseToInvitationEmail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DBAllEntriesResponseToInvitationEmail.prototype.doForward = function (t) {
        if (!t || !t.emailAddress || !t.id || !t.addressLabel) {
            return null;
        }
        var emailAddress = t.emailAddress.S;
        var addressLabel = t.addressLabel.S;
        var id = t.id.S;
        var hasRsvped = t.hasRsvped.BOOL;
        return { emailAddress: emailAddress, addressLabel: addressLabel, id: id, hasRsvped: hasRsvped };
    };
    DBAllEntriesResponseToInvitationEmail.prototype.doBackward = function (u) {
        if (!u) {
            return null;
        }
        return {
            emailAddress: {
                S: u.emailAddress
            },
            addressLabel: {
                S: u.addressLabel
            },
            id: {
                S: u.id
            },
            hasRsvped: {
                BOOL: u.hasRsvped
            }
        };
    };
    return DBAllEntriesResponseToInvitationEmail;
}(base_converter_class_1.BaseConverter));
exports.DBAllEntriesResponseToInvitationEmail = DBAllEntriesResponseToInvitationEmail;
exports.DBAllEntriesResponseToInvitationEmailConverter = new DBAllEntriesResponseToInvitationEmail();
