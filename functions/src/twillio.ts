import * as twillio from "twilio";
import * as functions from "firebase-functions";

const client = twillio(
    functions.config().twillio.accountsid,
    functions.config().twillio.authtoken
);

const sendSMS = async(to: string, body: string) => {
  return client.messages
    .create({
      from: functions.config().twillio.fromnumber,
      body,
      to
    });
};

export default sendSMS;