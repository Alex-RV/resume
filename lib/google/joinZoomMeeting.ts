import { ZoomMtg } from '@zoomus/websdk';

// Initialize Zoom Web SDK
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.0.1/lib', '/av');

type ZoomMeetingInfo = {
  apiKey: string;
  apiSecret: string;
  meetingNumber: string;
  password: string;
  userName: string;
};

export async function joinZoomMeeting(meetingInfo: ZoomMeetingInfo): Promise<string> {
  return new Promise((resolve, reject) => {
    const signature = ZoomMtg.generateSDKSignature({
      meetingNumber: meetingInfo.meetingNumber,
      sdkKey: meetingInfo.apiKey,
      sdkSecret: meetingInfo.apiSecret,
      role: '0',
      success: function (res) {
        console.log('Signature generated successfully');
        return res.result;
      },
    });

    ZoomMtg.init({
      leaveUrl: 'http://localhost',
      success: () => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingInfo.meetingNumber,
          userName: meetingInfo.userName,
          sdkKey: meetingInfo.apiKey,
          passWord: meetingInfo.password,
          success: () => {
            console.log('Joined meeting successfully');
            resolve('Joined meeting successfully');
          },
          error: (error) => {
            console.error('Error joining meeting:', error);
            reject('Error joining meeting');
          },
        });
      },
      error: (error) => {
        console.error('Error initializing Zoom SDK:', error);
        reject('Error initializing Zoom SDK');
      },
    });
  });
}
