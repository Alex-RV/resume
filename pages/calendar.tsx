import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import getAccessToken from '../lib/google/getAccessToken';
import getCalendarIds from '../lib/google/getCalendarIds';
import getEvents from '../lib/google/getCalendarEvents';
import getAuthInfoPopUp from '../lib/google/getAuthInfoPopUp';
import { AuthInfo, CalendarEvent, ZoomMeetingInfo, EntryPoint } from '../lib/types';
import {
  saveRefreshToken,
  loadRefreshToken,
  clearRefreshToken,
} from '../lib/google/tokenStorage';
import { encryptToken, decryptToken } from '../lib/google/tokenEncryption';

//necessary for sdk
import Zoom from  '@zoom/meetingsdk/embedded';

// Joining zoom bot
async function joinZoomMeeting(meetingCode, passcode) {
  const sdkClientId = process.env.NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID;
  const sdkSecret = process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET;
  if (!sdkClientId) {
    throw new Error("NEXT_PUBLIC_ZOOM_SDK_CLIENT_ID not set")
  }
  if (!sdkSecret) {
    throw new Error("NEXT_PUBLIC_ZOOM_SDK_SECRET not set")
  }
  if (!meetingCode) {
    throw new Error("meetingCode not passed")
  }
  if (!passcode) {
    throw new Error("passcode not passed")
  }

  try {
    // IMPORTANT, correct way of importing
    const ZoomMtgEmbedded = await (await import('@zoomus/websdk/embedded')).default;
    const jwtResponse = await fetch('/api/zoom/generateZoomJWT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sdkClientId: sdkClientId, 
        sdkSecret: sdkSecret, 
        meetingCode: meetingCode,
        role: 0 // a participant role
      })
    });
    
    if (!jwtResponse.ok) {
      throw new Error('Failed to generate JWT. Please check your server-side implementation.');
    }

    const jwtData = await jwtResponse.json();

    if (!jwtData.jwt) {
      throw new Error('JWT is missing in the response.');
    }

    console.log("jwtResponse",jwtData.jwt)

    const client = ZoomMtgEmbedded.createClient();
    console.log("created client")
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    if (!meetingSDKElement) {
      meetingSDKElement = document.createElement('div');
      meetingSDKElement.id = 'meetingSDKElement';
      document.body.appendChild(meetingSDKElement);
    }

    client.init({
      zoomAppRoot: meetingSDKElement,
      language: 'en-US'
    });

    console.log("meetingCode:",meetingCode," passcode:", passcode," jwtData.jwt:", jwtData.jwt )

    client.join({
      sdkKey: sdkClientId,
      signature: jwtData.jwt,
      meetingNumber: meetingCode,
      password: passcode,
      userName: 'ZoomBot'
    });

  } catch (error) {
    console.error('Error joining Zoom meeting:', error);
  }
}

// GET zoom events from events
const checkForZoomEvents = (events) => {
  if(events !== undefined){
    const zoomEvents = events.filter((event: CalendarEvent) => 
                event.conferenceData?.conferenceSolution.name === 'Zoom Meeting'
              );
    return zoomEvents
  }
}

// GET Google meet events from events
const checkForGoogleMeetEvents = (events) => {
  if(events !== undefined){
    const googleMeetEvents = events.filter((event: CalendarEvent) => 
                event.conferenceData?.conferenceSolution.name === 'Google Meet'
              );
    return googleMeetEvents
  }
}

// GET future events from events, based on the start date
const checkForFutureEvents = (events) => {
  if(events !== undefined){
    const futureEvents = events.filter((event: CalendarEvent) => {
      if (event.start && event.start.dateTime) {
        const eventDate = new Date(event.start.dateTime);
        const currentDate = new Date();

        return eventDate > currentDate;
      }
      return false;
    });
    return futureEvents;
  }  
}

// Initialize zoom bot joining for each of meeting/event
async function joinZoomBot (events) {
  if(events.length > 0){
    events.map((event: CalendarEvent) => {
      const entryPoints = event.conferenceData.entryPoints;
      if(entryPoints){
        entryPoints.map(async (entryPoint: EntryPoint) => {
          if (typeof window !== 'undefined' && entryPoint.entryPointType === "video") {
            try {
              const meetingCode = entryPoint.meetingCode;
              const passcode = entryPoint.passcode;
              console.log("meetingCode", meetingCode, "entryPoint", entryPoint)
              
              const response = await joinZoomMeeting(meetingCode, passcode);
              console.log("response",response)
            } catch (error) {
              console.error('Error processing entry point:', error);
            }
          }
        })
      }
    }
    )
  }
}

export default function Calendar() {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleZoomLogoutClick = async () => {
    const accessToken = localStorage.getItem('ZOOM_USER_ACCESS_TOKEN');

    const response = await fetch('/api/zoom/revoke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
    });

    const data = await response.json();
    if (response.ok) {
        console.log(data.message);
        localStorage.removeItem('ZOOM_USER_ACCESS_TOKEN');
    } else {
        console.error(data.message);
        // Handle errors (e.g., show error message)
    }
};


  const handleAuthClick = () => {
    window.open('/api/zoom/auth', '_blank', 'width=500,height=800');
  
    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) {
        return;
      }
  
      if (event.data.accessToken) {
        console.log('Access Token:', event.data.accessToken);
        localStorage.setItem('ZOOM_USER_ACCESS_TOKEN', event.data.accessToken);
        
      }
    }, false);
  };

  const fetchRecordings = async () => {
    const accessToken = localStorage.getItem('ZOOM_USER_ACCESS_TOKEN');;
    const response = await fetch('/api/zoom/getRecordings', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        console.error('Failed to fetch recordings');
        return;
    }

    const recordings = await response.json();
    console.log(recordings); // Process the list of recordings
};


  const handleGoogleLogin = async () => {
    try {
      setIsLoadingAuth(true);
      const authInfo: AuthInfo = await getAuthInfoPopUp(window);
      setIsLoadingAuth(false);

      setIsLoggedIn(true);
      saveRefreshToken(encryptToken(authInfo.refresh_token));
      

      const accessToken = await getAccessToken(authInfo.refresh_token);

      setIsLoadingEvents(true);
      const fetchedEvents = await getEvents(accessToken);
      setEvents(fetchedEvents.reverse());
      setIsLoadingEvents(false);

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
            // to make latest events on top
            fetchedEvents.reverse();

            setEvents(fetchedEvents);
            console.log(fetchedEvents)

            const futureEvents = checkForFutureEvents(fetchedEvents);
            console.log("futureEvents:",futureEvents);

            const zoomEvents = checkForZoomEvents(futureEvents);
            console.log("zoomEvents", zoomEvents);

            // joinZoomBot(zoomEvents);

            //testing meeeting
            // const response = await joinZoomMeeting("81946311942", "037329");
            // console.log("response",response)
             
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
      <div id="meetingSDKElement"></div>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold">Your Calendar</h1>
          <button onClick={handleAuthClick}>Connect to Zoom</button>
          <button onClick={handleZoomLogoutClick}>Log out from Zoom</button>
          <button onClick={fetchRecordings}>Fetch Zoom Reordings</button>
        </div>
        
        {isLoadingAuth ? (
          <div className="text-lg">Loading authentication...</div>
        ) : isLoggedIn ? (
          // Authenticated state
          <div className='flex flex-col'>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-36"
            >
              Logout
            </button>

            {/* Event Loading State */}
            {isLoadingEvents ? (
              <div className="text-lg mt-4">Loading events...</div>
            ) : (
              // Event Display
              <div className="mt-8 flex flex-col overflow-auto max-w-2xl">
                {events.length > 0 ? (
                  events.map((event: CalendarEvent) => (
                    <EventCard event={event} key={event.id} />
                  ))
                ) : (
                  <div className="text-lg">No events found.</div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Unauthenticated state
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

const EventCard = ({ event }) => (
  <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden mb-4">
    {event.status !== 'cancelled' ? (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{event.summary}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Creator:</strong> {event.creator?.displayName} ({event.creator?.email})</p>
            <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Organizer:</strong> {event.organizer?.displayName} ({event.organizer?.email})</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Start:</strong> {event.start?.dateTime}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400"><strong>End:</strong> {event.end?.dateTime}</p>
          </div>
        </div>

        {/* Additional Event Details */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Status:</strong> {event.status}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400"><strong>HTML Link:</strong> <a href={event.htmlLink} className="text-blue-500 hover:text-blue-600">{event.htmlLink}</a></p>

        {/* Conditional Rendering for Conference Data */}
        {event.conferenceData && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Conference ID:</strong> {event.conferenceData.conferenceId}</p>
            {/* Display Conference Entry Points */}
            {event.conferenceData.entryPoints.map((entryPoint, index) => (
              <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{entryPoint.label}: {entryPoint.entryPointType}</p>
            ))}
          </div>
        )}
        
        {/* Attendees */}
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Attendees:</strong></p>
          {event.attendees?.map((attendee, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400 pl-2">{attendee.email} (Status: {attendee.responseStatus})</p>
          ))}
        </div>
      </div>
    ) : (
      <div className="text-red-500 p-4">Event Cancelled</div>
    )}
  </div>
);
