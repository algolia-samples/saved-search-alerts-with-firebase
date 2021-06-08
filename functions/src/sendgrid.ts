// Send a mail using Sendgrid API
// https://www.npmjs.com/package/@sendgrid/mail

import * as sendgrid from "@sendgrid/mail";
import * as functions from "firebase-functions";

sendgrid.setApiKey(functions.config().sendgrid.apikey);

const sendMail = async (
    to: string,
    subject: string,
    text: string,
    html?: string
): Promise<void> => {
  const msg = {
    to,
    subject,
    text,
    html,
    from: functions.config().sendgrid.fromemail,
  };
  await sendgrid.send(msg);
};

export default sendMail;
