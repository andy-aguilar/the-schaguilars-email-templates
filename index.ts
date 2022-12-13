import { AllDBEntriesResponse } from "./model/invitation-email/all-db-entries-response.interface";
import { InvitationEmailDataObject } from "./model/invitation-email/invitation-email-data-object.interface";
import { DBAllEntriesResponseToInvitationEmailConverter } from "./util/converter/db-entries-response-to-invitation-email.converter";
import {
  SESv2Client,
  SendBulkEmailCommand,
  BulkEmailEntry,
} from "@aws-sdk/client-sesv2";
import {DB_TABLE_NAME} from './dbconfig.const'

var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

var ddb = new AWS.DynamoDB();

const client = new SESv2Client({ region: "us-east-2" });

const params = {
  ExpressionAttributeNames: {
    "#AL": "addressLabel",
    "#EA": "emailAddress",
    "#ID": "id",
    "#HR": "hasRsvped",
  },
  ProjectionExpression: "#AL, #EA, #ID, #HR",
  TableName: DB_TABLE_NAME,
};

// const FILTER_EMAILS: string[] = ["aaguil3@gmail.com"];

function isEmailValid(email: string | undefined): boolean {
  if (!email) {
    return false;
  }

  return true;
}

async function runScript(): Promise<void> {
  ddb.scan(params, (err, data) => {
    if (err) {
      console.error("Error: ", err);
    } else {
      const filteredRecords: (InvitationEmailDataObject | null)[] =
        getFilteredRecords(data.Items);

      const sendBulkEmailCommandInput = {
        BulkEmailEntries: getBulkEmailEntriesFromRecords(filteredRecords),
        DefaultContent: {
          Template: {
            TemplateName: "rsvpEmail",
            TemplateData: JSON.stringify({ addressLabel: "test", id: "1235" }),
          },
        },
        FromEmailAddress:
          "Kristin and Andy <TheFutureAguilars@kristinandandy.com>",
      };

      console.log(sendBulkEmailCommandInput);

      const command = new SendBulkEmailCommand(sendBulkEmailCommandInput);

      console.log(command);

      const response = client.send(command);
    }
  });
}

function getBulkEmailEntriesFromRecords(
  records: (InvitationEmailDataObject | null)[]
): BulkEmailEntry[] {
  return records.map(getBulkEmailEntryFromRecord);
}

function getBulkEmailEntryFromRecord(
  record: InvitationEmailDataObject | null
): BulkEmailEntry {
  if (!record) {
    return {
      Destination: {
        ToAddresses: ["aaguil3@gmail.com"],
      },
    };
  } else {
    const { addressLabel, id } = record;

    return {
      Destination: {
        ToAddresses: [record?.emailAddress],
      },
      ReplacementEmailContent: {
        ReplacementTemplate: {
          ReplacementTemplateData: JSON.stringify({ addressLabel, id }),
        },
      },
    };
  }
}

function getFilteredRecords(
  records: AllDBEntriesResponse[]
): (InvitationEmailDataObject | null)[] {
  const unpackedRecords: (InvitationEmailDataObject | null)[] =
    DBAllEntriesResponseToInvitationEmailConverter.convertAll(records);

  const filteredRecords: (InvitationEmailDataObject | null)[] =
    unpackedRecords.filter((record) => {
      return isEmailValid(record?.emailAddress) && !record?.hasRsvped;
    });

  return filteredRecords;
}

runScript();
