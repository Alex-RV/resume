/**
 * Retrieves the list of calendars for the authenticated user.
 *
 * @param {string} accessToken - The access token obtained from getAccessToken function.
 * @returns {Promise<string[]>} A promise that resolves to an array of calendar IDs.
 * @throws {Error} If the request to the Google Calendar API fails or if no calendar IDs are returned.
 */
export default async function getCalendarIds(accessToken: string): Promise<string[]> {
    const response = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
  
    const json = await response.json();
  
    if (!json.items || json.items.length === 0) {
      throw new Error(`No calendars found: ${JSON.stringify(json, null, 2)}`);
    }
  
    // Extract calendar IDs from the list
    const calendarIds = json.items.map((calendar: any) => calendar.id);
  
    return calendarIds;
  }