export interface AuthInfo{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface CalendarEvent {
    kind: string;
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created: string;
    updated: string;
    summary: string;
    creator: {
      email: string;
      displayName: string;
    };
    organizer: {
      email: string;
      displayName: string;
      self: boolean;
    };
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
    iCalUID: string;
    sequence: number;
    attendees?: {
        email: string;
        self?: boolean;
        responseStatus: string;
        organizer?: boolean;
      }[];
    extendedProperties?: {
      shared: {
        meetingId: string;
        zmMeetingNum: string;
        meetingParams: string;
      };
    };
    conferenceData?: {
      entryPoints: {
        entryPointType: string;
        uri: string;
        label?: string;
        meetingCode?: string;
        passcode?: string;
        regionCode?: string;
      }[];
      conferenceSolution: {
        key: {
          type: string;
        };
        name: string;
        iconUri: string;
      };
      conferenceId: string;
      notes: string;
      parameters: {
        addOnParameters: {
          parameters: {
            scriptId: string;
            realMeetingId: string;
            creatorUserId: string;
            meetingUuid: string;
            meetingType: string;
            originalEventId: string;
          };
        };
      };
    };
    guestsCanModify?: boolean;
    reminders: {
      useDefault: boolean;
    };
    eventType: string;
  }
  