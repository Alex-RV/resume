import React from 'react'
import Container from '../components/Container'
import getAccessToken from "../lib/google/getAccessToken"
import getCalendarIds from "../lib/google/getCalendarIds"
import getEvents from "../lib/google/getCalendarEvents"
import getAccessTokenPopUp from "../lib/google/getAccessTokenPopUp"

export default function calendar() {

    const handleGoogleLogin = async () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
        const redirectUri = window.location.origin + '/callback';
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly`;
      
        // Open a new window for authentication
        const popup = window.open(authUrl, '_blank', 'width=600,height=600');
      
        // Listen for messages from the popup
        window.addEventListener('message', async (event) => {
          if (event.origin === window.location.origin) {
            // Close the popup
            popup.close();
      
            // Extract access token from the response
            const accessToken = event.data.access_token;
      
            // Use the access token as needed (e.g., make API requests)
            console.log('Access Token:', accessToken);
          }
        });
      };
      

    async function handleGetCalendarId() {
        try {
          const accessToken = await getAccessTokenPopUp();
          const calendarId = await getCalendarIds(accessToken);
          console.log("calendarId: ", calendarId);
    
          const events = await getEvents(accessToken);
          console.log("Events: ", events);
        } catch (error) {
          console.error("Error:", error);
        }
      }
  return (
    <Container>
        <div className='flex flex-col text-black justify-center items-center'>
            <div>
                <h1>Your Calendar</h1>
            </div>
            <div className='flex flex-col text-2xl'>
                <button onClick={() => handleGetCalendarId()}>
                    CalendarId
                </button>
                <button onClick={handleGoogleLogin}>Login with Google</button>

            </div>
        </div>
    </Container>
  )
}
