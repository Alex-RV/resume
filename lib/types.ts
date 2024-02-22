export interface AuthInfo{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface EntryPoint{
    entryPointType: string;
    uri: string;
    label?: string;
    meetingCode?: string;
    passcode?: string;
    regionCode?: string;
}
export interface ZoomMeetingInfo{
  conferenceId: string;
  entryPoints: {
    entryPointType: string;
    uri: string;
    passcode: string;
    meetingCode: string;
  }
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
  
  interface ZoomRecordingsResponse {
    from: string;
    to: string;
    page_count: number;
    page_size: number;
    total_records: number;
    next_page_token: string;
    meetings: ZoomMeetingRecording[];
  }
  
  interface ZoomMeetingRecording {
    uuid: string;
    id: number;
    account_id: string;
    host_id: string;
    topic: string;
    type: number;
    start_time: string;
    duration: number;
    timezone: string;
    total_size: number;
    recording_count: number;
    share_url: string;
    recording_files: ZoomRecordingFile[];
  }
  
  interface ZoomRecordingFile {
    id: string;
    meeting_id: string;
    recording_start: string;
    recording_end: string;
    file_type: string;
    file_size: number;
    play_url: string;
    download_url: string;
    status: string;
    recording_type: string;
  }
  