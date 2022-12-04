import { AllDBEntriesResponse } from "./model/invitation-email/all-db-entries-response.interface";
import { InvitationEmailDataObject } from "./model/invitation-email/invitation-email-data-object.interface";
import { DBAllEntriesResponseToInvitationEmailConverter } from "./util/converter/db-entries-response-to-invitation-email.converter";

var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

var ddb = new AWS.DynamoDB();

const params = {
  ExpressionAttributeNames: {
    "#AL": "addressLabel",
    "#EA": "emailAddress",
    "#ID": "id",
  },
  ProjectionExpression: "#AL, #EA, #ID",
  TableName: "Rsvp-r3yc2rbtbnarxhyeptux54mu3e-prod",
};

const FILTER_EMAILS: string[] = ["aaguil3@gmail.com", "Kattyaaguilar@me.com"];

function isEmailValid(email: string | undefined): boolean {
  if (!email) {
    return false;
  }

  return FILTER_EMAILS.includes(email);
}

function runScript(): void {
  ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      const filteredRecords: (InvitationEmailDataObject | null)[] =
        getFilteredRecords(data.Items);
      console.log(filteredRecords);
    }
  });
}

function getFilteredRecords(
  records: AllDBEntriesResponse[]
): (InvitationEmailDataObject | null)[] {
  const unpackedRecords: (InvitationEmailDataObject | null)[] =
    DBAllEntriesResponseToInvitationEmailConverter.convertAll(records);

  const filteredRecords: (InvitationEmailDataObject | null)[] =
    unpackedRecords.filter((record) => isEmailValid(record?.emailAddress));

  return filteredRecords;
}

runScript();
