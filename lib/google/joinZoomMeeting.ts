import { ZoomMtg } from "@zoomus/websdk";

// const zoomMeeting = ZoomMtg;
let zoomMeeting = ZoomMtg;

if (typeof window !== 'undefined') {
    zoomMeeting = require('@zoomus/websdk').ZoomMtg;
}
const sdkKey = process.env.NEXT_PUBLIC_ZOOM_API_KEY;

if (!sdkKey) {
  throw new Error("NEXT_PUBLIC_ZOOM_API_KEY not set");
}

// Separate function to fetch Zoom signature
async function fetchZoomSignature(meetingNumber: string): Promise<string> {
  const response = await fetch('/api/zoom-signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      meetingNumber,
      role: '0' // 0 for participant, 1 for host
    })
  });

  const { signature } = await response.json();
  return signature;
}

// Function to initialize and join the Zoom meeting
export const joinZoomMeeting = async (meetingId: string, passcode: string): Promise<void> => {
  try {
    const signature = await fetchZoomSignature(meetingId);

    return new Promise((resolve, reject) => {
      zoomMeeting.init({
        leaveUrl: 'http://localhost:3000/leave',
        isSupportAV: true,
        success: () => {
          zoomMeeting.join({
            meetingNumber: meetingId,
            userName: 'User', // Dynamic username
            sdkKey,
            signature,
            passWord: passcode,
            success: () => {
              console.log('Joined meeting successfully');
              resolve();
            },
            error: (error) => {
              console.error('Error joining meeting', error);
              reject(error);
            }
          });
        },
        error: (error) => {
          console.error('Error initializing Zoom SDK', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching Zoom signature:', error);
    throw error;
  }
};
