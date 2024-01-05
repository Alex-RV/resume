import React, {useState, useEffect} from 'react'
import Container from '../components/Container'
import getAccessToken from "../lib/google/getAccessToken"
import getCalendarIds from "../lib/google/getCalendarIds"
import getEvents from "../lib/google/getCalendarEvents"
import getAuthInfoPopUp from "../lib/google/getAuthInfoPopUp"
import { AuthInfo, CalendarEvent } from '../lib/google/types.google'
import { saveRefreshToken, loadRefreshToken, clearRefreshToken } from '../lib/google/tokenStorage'
import { encryptToken, decryptToken } from '../lib/google/tokenEncryption'

export default function calendar() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [events, setEvents] = useState<any[]>([]);

    const handleGoogleLogin = async () => {
            try {
                setIsLoading(true)
                const authInfo:AuthInfo = await getAuthInfoPopUp(window);
                setIsLoading(false)
                setIsLoggedIn(true);
                saveRefreshToken(encryptToken(authInfo.refresh_token));
                const accessToken = await getAccessToken(authInfo.refresh_token);
                const events = await getEvents(accessToken);
                setEvents(events.reverse());
                console.log('Events: ', events);
        
              } catch (error) {
                console.error("Error:", error);
              }
      };
      
      const handleLogout = () => {
        // Clear the stored refresh token and log out
        clearRefreshToken();
        setIsLoggedIn(false);
      };
    
      useEffect(() => {
        const checkSession = async () => {
          // Check if refresh token exists
          const refreshToken = decryptToken(loadRefreshToken());
          if (refreshToken) {
            try {
              // If refresh token exists, try to get a new access token
              const accessToken = await getAccessToken(refreshToken);
    
              const events = await getEvents(accessToken);
              setEvents(events.reverse());
    
              setIsLoggedIn(true);
            } catch (error) {
              console.error('Error refreshing token:', error);
              setIsLoggedIn(false);
            }
          } else {
            setIsLoggedIn(false);
          }
    
          setIsLoading(false);
        };
    
        checkSession();
      }, []);
      
    
     
      return (
        <Container>
          <div className="flex flex-col text-black justify-center items-center">
            <div>
              <h1>Your Calendar</h1>
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : isLoggedIn ? (
              <div>
                <button onClick={handleLogout}>Logout</button>
                <div className="mt-8">
                  {events.length > 0 ? (
                    events.map((event : CalendarEvent) => (
                      <div key={event.id} className="bg-white rounded shadow p-4 mb-4">
                        <h2 className="text-lg font-bold mb-2">{event.summary}</h2>
                        {event.start && event.end && (
                            <p className="text-sm text-gray-500">
                                {`${new Date(event.start.dateTime)?.toLocaleString()} - ${new Date(event.end.dateTime)?.toLocaleString()}`}
                            </p>
                        )}
                        <p className="text-sm text-gray-700 mt-2">{event.summary}</p>
                      </div>
                    ))
                  ) : (
                    <div>No events found.</div>
                  )}
                </div>
              </div>
            ) : (
                <div className="flex flex-col text-2xl">
                <button onClick={handleGoogleLogin}>Login with Google</button>
              </div>
            )}
          </div>
        </Container>
      );
    };