import React from 'react'
import Container from '../components/Container'
import getAccessToken from "../lib/google/getAccessToken"
import getCalendarIds from "../lib/google/getCalendarIds"
import getEvents from "../lib/google/getCalendarEvents"
import getAccessTokenPopUp from "../lib/google/getAccessTokenPopUp"

export default function calendar() {


    async function handleGetCalendarId() {
        // const accessToken = await getAccessToken();
        const accessToken = await getAccessTokenPopUp();

        const calendarId = await getCalendarIds(accessToken);
        console.log("calendarId: ",calendarId)

        const events = await getEvents(accessToken);
        console.log("Events: ",events);
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
            </div>
        </div>
    </Container>
  )
}
