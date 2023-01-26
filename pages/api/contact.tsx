export default async (req, res) => {
  require('dotenv').config()
  const PASSWORD_KEY = process.env.PASSWORD_KEY

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
      user: 'alex-riabov-resume@outlook.com',
      pass: PASSWORD_KEY,
    },
    tls: {
      ciphers:'SSLv3'
  }
  })
  const mailData = {
    from: 'alex-riabov-resume@outlook.com',
    to: 'alexsandrr2005@gmail.com',
    subject: `[Lead from website] : ${req.body.subject}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
    <head>
      <meta charset="utf-8">
    
      <title>The HTML5 Herald</title>
      <meta name="description" content="The HTML5 Herald">
      <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    
      <link rel="stylesheet" href="css/styles.css?v=1.0">
    
    </head>
    
    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
            </div>
            <div class="container" style="margin-left: 20px;margin-right: 20px;">
            <h3>You've got a new mail from ${req.body.fullname}, their email is: ✉️${req.body.email} </h3>
            <div style="font-size: 16px;">
            <p>Message:</p>
            <p>${req.body.message}</p>
            <br>
            </div>
            <img src="https://alex-riabov.vercel.app/_next/image?url=%2Flogo.jpg&w=828&q=75" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
            </div>
    </body>
    </html>`,
  }
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});
  res.status(200)
  res.send()
}