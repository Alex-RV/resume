import React from 'react'
import Container from '../components/Container'
import getAccessToken from "../lib/google/getAccessToken"
import getCalendarIds from "../lib/google/getCalendarIds"
import getEvents from "../lib/google/getCalendarEvents"
import getAuthInfoPopUp from "../lib/google/getAuthInfoPopUp"

export default function calendar() {

    const handleGoogleLogin = async () => {
            try {
                const authInfo = await getAuthInfoPopUp(window);
                // const calendarId = await getCalendarIds(accessToken);
                // console.log("calendarId: ", calendarId);
          
                // const events = await getEvents(accessToken);
                // console.log("Events: ", events);
              } catch (error) {
                console.error("Error:", error);
              }
      };
      
  return (
    <Container>
        <div className='flex flex-col text-black justify-center items-center'>
            <div>
                <h1>Your Calendar</h1>
            </div>
            <div className='flex flex-col text-2xl'>
                <button onClick={handleGoogleLogin}>Login with Google</button>

            </div>
        </div>
    </Container>
  )
}
