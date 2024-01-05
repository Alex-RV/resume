import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import getAccessToken from '../lib/google/getAccessToken';
import getCalendarIds from '../lib/google/getCalendarIds';
import getEvents from '../lib/google/getCalendarEvents';
import getAuthInfoPopUp from '../lib/google/getAuthInfoPopUp';
import { AuthInfo, CalendarEvent } from '../lib/google/types.google';
import {
  saveRefreshToken,
  loadRefreshToken,
  clearRefreshToken,
} from '../lib/google/tokenStorage';
import { encryptToken, decryptToken } from '../lib/google/tokenEncryption';

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

          const fetchedEvents = await getEvents(accessToken);
          setEvents(fetchedEvents.reverse());

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
      <div className="flex flex-col justify-center items-center text-black dark:text-white">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Your Calendar</h1>
        </div>
        {isLoadingAuth ? (
          <div className="text-lg">Loading authentication...</div>
        ) : isLoggedIn ? (
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
            {isLoadingEvents ? (
              <div className="text-lg mt-4">Loading events...</div>
            ) : (
              <div className="mt-8">
                {events.length > 0 ? (
                  events.map((event: CalendarEvent) => (
                    <div
                      key={event.id}
                      className="bg-gray-100 rounded shadow p-4 mb-4"
                    >
                      <h2 className="text-xl font-bold mb-2">{event.summary}</h2>
                      {event.start && event.end && (
                        <p className="text-sm text-gray-500">
                          {`${new Date(
                            event.start.dateTime
                          )?.toLocaleString()} - ${new Date(
                            event.end.dateTime
                          )?.toLocaleString()}`}
                        </p>
                      )}
                      {/* <p className="text-sm text-gray-700 mt-2">
                        {event.description || 'No description available'}
                      </p> */}
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