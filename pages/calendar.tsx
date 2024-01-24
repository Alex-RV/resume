import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import getAccessToken from '../lib/google/getAccessToken';
import getCalendarIds from '../lib/google/getCalendarIds';
import getEvents from '../lib/google/getCalendarEvents';
import getAuthInfoPopUp from '../lib/google/getAuthInfoPopUp';
import { AuthInfo, CalendarEvent, ZoomMeetingInfo, EntryPoint } from '../lib/google/types.google';
import {
  saveRefreshToken,
  loadRefreshToken,
  clearRefreshToken,
} from '../lib/google/tokenStorage';
import { encryptToken, decryptToken } from '../lib/google/tokenEncryption';
import {joinZoomMeeting} from '../lib/google/joinZoomMeeting'

export default function Calendar() {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoadingAuth(true);
      const authInfo: AuthInfo = await getAuthInfoPopUp(window);
      setIsLoadingAuth(false);
      setIsLoggedIn(true);
      console.log(authInfo)
      saveRefreshToken(encryptToken(authInfo.refresh_token));
      

      const accessToken = await getAccessToken(authInfo.refresh_token);
      setIsLoadingEvents(true);

      const fetchedEvents = await getEvents(accessToken);
      setEvents(fetchedEvents.reverse());
      setIsLoadingEvents(false);
      console.log('Events: ', fetchedEvents);
    } catch (error) {
      console.error('Error:', error);
      setError('Error during login');
      setIsLoadingAuth(false);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    clearRefreshToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const refreshToken = decryptToken(loadRefreshToken());

      if (refreshToken) {
        try {
          const accessToken = await getAccessToken(refreshToken);
          setIsLoadingEvents(true);

          try {
            const fetchedEvents = await getEvents(accessToken);
            fetchedEvents.reverse();
            setEvents(fetchedEvents);
            console.log(fetchedEvents)

            const futureEvents = fetchedEvents.filter((event: CalendarEvent) => {
              if (event.start && event.start.dateTime) {
                const eventDate = new Date(event.start.dateTime);
                const currentDate = new Date();
    
                // Check if the event is in the future
                return eventDate > currentDate;
              }
              return false;
            });  
            console.log("futureEvents:",futureEvents);

            const googleMeetEvents = fetchedEvents.filter((event: CalendarEvent) => 
              event.conferenceData?.conferenceSolution.name === 'Google Meet'
            );
            
            const zoomEvents = fetchedEvents.filter((event: CalendarEvent) => 
              event.conferenceData?.conferenceSolution.name === 'Zoom Meeting'
            );

            console.log("googleMeetEvents", googleMeetEvents);
            console.log("zoomEvents", zoomEvents);

            if(zoomEvents.length > 0){
              zoomEvents.map((event: CalendarEvent) => {
                const entryPoints = event.conferenceData.entryPoints;
                if(entryPoints){
                  entryPoints.map((entryPoint: EntryPoint) => {
                    if (typeof window !== 'undefined') {
                      // Call joinZoomMeeting function here
                      joinZoomMeeting('meetingId', 'passcode');
                    }
                  })
                }
              }
              )
            }
             
            
          } catch (e) {
            console.error('Error fetching events:', e);
          }
          setIsLoggedIn(true);
          setIsLoadingEvents(false);
        } catch (error) {
          console.error('Error refreshing token:', error);
          setIsLoggedIn(false);
          setError('Error refreshing token');
        }
      } else {
        setIsLoggedIn(false);
      }

      setIsLoadingAuth(false);
    };

    checkSession();
  }, []);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center text-black dark:text-white mx-auto max-w-2xl">
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold">Your Calendar</h1>
        </div>
        {isLoadingAuth ? (
          <div className="text-lg">Loading authentication...</div>
        ) : isLoggedIn ? (
          <div className='flex flex-col'>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-36"
            >
              Logout
            </button>
            {isLoadingEvents ? (
              <div className="text-lg mt-4">Loading events...</div>
            ) : (
              <div className="mt-8 flex flex-col overflow-auto max-w-2xl">
                {events.length > 0 ? (
                  events.map((event: CalendarEvent) => (
                    <div
                    key={event.id}
                    className="flex flex-col bg-[#eeeeee] dark:bg-slate-600 rounded shadow p-4 mb-4 max-w-2xl overflow-auto"
                    >
                    {event.status !== 'cancelled' ? (
                        <>
                        <div className="mb-2">
                            <strong className="text-lg truncate">Summary:</strong> {event.summary}
                        </div>
                        <div className="flex flex-col md:flex-row mb-2">
                            <div className="md:mr-4">
                            <strong className="text-sm">Creator:</strong> {event.creator?.displayName} ({event.creator?.email})
                            </div>
                            <div>
                            <strong className="text-sm">Organizer:</strong> {event.organizer?.displayName} ({event.organizer?.email})
                            </div>
                        </div>
                        <div className='flex flex-col overflow-auto'>
                            <div className="mb-2">
                                <strong className="text-sm">Start:</strong> {event.start?.dateTime} ({event.start?.timeZone})
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">End:</strong> {event.end?.dateTime} ({event.end?.timeZone})
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Status:</strong> {event.status}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">HTML Link:</strong> {event.htmlLink}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Created:</strong> {event.created}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Updated:</strong> {event.updated}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Conference Data:</strong> {event.conferenceData?.conferenceId}
                                <p className="text-sm">Conference Data:</p> {event.conferenceData?.entryPoints?.map((entryPoint) => (
                                <div key={entryPoint.label} className="ml-2">
                                    {entryPoint.label} Meeting Type: {entryPoint.entryPointType}
                                </div>
                                ))}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Attendees:</strong>{' '}
                                {event.attendees?.map((attendee) => (
                                <div key={attendee.email} className="ml-2">
                                    {attendee.email} (Status: {attendee.responseStatus})
                                </div>
                                ))}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Extended Properties:</strong>{' '}
                                {event.extendedProperties?.shared?.meetingId}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Conference Data:</strong>{' '}
                                {event.conferenceData?.conferenceId}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Guests Can Modify:</strong> {event.guestsCanModify ? 'Yes' : 'No'}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Reminders:</strong> {event.reminders?.useDefault ? 'Use Default' : 'Custom'}
                            </div>
                            <div className="mb-2">
                                <strong className="text-sm">Event Type:</strong> {event.eventType}
                            </div>
                        </div>
                            </>
                        ) : (
                            <div className="text-red-500">Event Cancelled</div>
                        )}
                        </div>
                  ))
                ) : (
                  <div className="text-lg">No events found.</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col text-2xl mt-16 mb-16">
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login with Google
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        )}
      </div>
    </Container>
  );
};