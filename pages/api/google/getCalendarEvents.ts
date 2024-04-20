// /api/google/getCalendarEvents.ts

// Retrieves events from the primary calendar for the authenticated user.
//
// @param {string} accessToken - The access token obtained from getAccessToken token function.
// @returns {Promise<object[]>} A promise that resolves to an array of events.
// @throws {Error} If the request to the Google Calendar API fails or if no events are returned.
export default async function handler(req, res) {
    const accessToken = req.query.accessToken;
  
    if (!accessToken) {
      res.status(400).json({ error: "accessToken not provided correctly" });
      return;
    }
  
    try {
      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
  
      const json = await response.json();
  
      if (!json.items || json.items.length === 0) {
        throw new Error(`No events found: ${JSON.stringify(json, null, 2)}`);
      }
  
      // Extract events from the list
      const events = json.items;
  
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  