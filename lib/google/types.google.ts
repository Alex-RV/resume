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
    reminders: {
      useDefault: boolean;
    };
    eventType: string;
  }
  