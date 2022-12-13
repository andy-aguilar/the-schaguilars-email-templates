import { AllDBEntriesResponse } from "../../model/invitation-email/all-db-entries-response.interface";
import { InvitationEmailDataObject } from "../../model/invitation-email/invitation-email-data-object.interface";
import { BaseConverter } from "./base-converter.class";

export class DBAllEntriesResponseToInvitationEmail extends BaseConverter<
  AllDBEntriesResponse,
  InvitationEmailDataObject
> {
  doForward(t: AllDBEntriesResponse): InvitationEmailDataObject | null {
    if (!t || !t.emailAddress || !t.id || !t.addressLabel) {
      return null;
    }

    const emailAddress: string = t.emailAddress.S;
    const addressLabel: string = t.addressLabel.S;
    const id: string = t.id.S;
    const hasRsvped: boolean = t.hasRsvped.BOOL;

    return { emailAddress, addressLabel, id, hasRsvped };
  }

  doBackward(u: InvitationEmailDataObject): AllDBEntriesResponse | null {
    if (!u) {
      return null;
    }
    return {
      emailAddress: {
        S: u.emailAddress,
      },
      addressLabel: {
        S: u.addressLabel,
      },
      id: {
        S: u.id,
      },
      hasRsvped: {
        BOOL: u.hasRsvped,
      },
    };
  }
}

export const DBAllEntriesResponseToInvitationEmailConverter =
  new DBAllEntriesResponseToInvitationEmail();
