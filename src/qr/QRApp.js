import React from "react";
import { Button } from '@material-ui/core';

const apiKey = 'cdb545eb2e072c570ae2a9899d74ee11';
const apiSecret = 'f6aa0f8909e5fbf0a226f157b75f408a';

const Mailjet = require('node-mailjet');
const mailjet = Mailjet.Client.apiConnect(
  apiKey,
  apiSecret,
);

export default function QRApp() {
  const sendMessage = () => {
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "jeg4@rice.edu",
            "Name": "Joseph"
          },
          "To": [
            {
              "Email": "jeg4@rice.edu",
              "Name": "Joseph"
            }
          ],
          "Subject": "Greetings from Mailjet.",
          "TextPart": "My first Mailjet email",
          "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    });

    request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
  };

  // const sendMessage2 = () => {
  //   const encoded = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  //   fetch('https://api.mailjet.com/v3.1/send',{
  //     method : 'POST',
  //     mode : 'no-cors',
  //     headers: {
  //       Authorization: `Basic ${encoded}`
  //     },
  //     body : {
  //       "Messages":[
  //         {
  //           "From": {
  //             "Email": "jeg4@rice.edu",
  //             "Name": "Toto"
  //           },
  //           "To": [
  //             {
  //               "Email": "jeg4@rice.edu"
  //             }
  //           ],
  //           "TemplateID": 1094249,
  //           "TemplateLanguage": true,
  //           "Subject": "Hi there",
  //           "Variables": {

  //           }
  //         }
  //       ]
  //     }
  //   })
  //   .then(resp=>resp.json())
  //   .then(data => {
  //     console.log('data mailjet', data);
  //   })
  //   .catch(err => err);
  // };

  return (
    <div>
      <h2>Hi! I'm Joseph!!</h2>
      <br />
      <h2>Ask me a question:</h2>
      <Button variant="contained" onClick={sendMessage}
        style={{
          marginBottom: 8
        }} color="primary">
        Add balls!
      </Button>
    </div>
  );
}