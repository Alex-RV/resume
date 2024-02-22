// pages/api/zoom/getRecordings.js

export default async function handler(req, res) {
    const accessToken = req.headers.authorization.split(' ')[1]; // Assuming the access token is passed in the Authorization header
    const userId = 'me'; // Use 'me' as userId to refer to the authenticated user

    try {
        const fromDate = '2022-01-01'; // start of the date range
        const today = new Date().toISOString().split('T')[0]; 

        //Only can retrive 1 month before!
        const toDate = today;   // end of the date range
        // const toDate = '2023-02-22';  

        const response = await fetch(`https://api.zoom.us/v2/users/${userId}/recordings?from=${fromDate}&to=${toDate}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recordings');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching recordings:', error);
        res.status(500).json({ message: 'Error fetching recordings' });
    }
}
