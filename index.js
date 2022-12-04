"use strict";
exports.__esModule = true;
var db_entries_response_to_invitation_email_converter_1 = require("./util/converter/db-entries-response-to-invitation-email.converter");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
var ddb = new AWS.DynamoDB();
var params = {
    ExpressionAttributeNames: {
        "#AL": "addressLabel",
        "#EA": "emailAddress",
        "#ID": "id"
    },
    ProjectionExpression: "#AL, #EA, #ID",
    TableName: "Rsvp-r3yc2rbtbnarxhyeptux54mu3e-prod"
};
var FILTER_EMAILS = ["aaguil3@gmail.com", "Kattyaaguilar@me.com"];
function isEmailValid(email) {
    if (!email) {
        return false;
    }
    return FILTER_EMAILS.includes(email);
}
function runScript() {
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error: ", err);
        }
        else {
            var filteredRecords = getFilteredRecords(data.Items);
            console.log(filteredRecords);
        }
    });
}
function getFilteredRecords(records) {
    var unpackedRecords = db_entries_response_to_invitation_email_converter_1.DBAllEntriesResponseToInvitationEmailConverter.convertAll(records);
    var filteredRecords = unpackedRecords.filter(function (record) { return isEmailValid(record === null || record === void 0 ? void 0 : record.emailAddress); });
    return filteredRecords;
}
runScript();
