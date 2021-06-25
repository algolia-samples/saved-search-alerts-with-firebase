import * as fs from "fs";
import * as path from "path";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as handlebars from "handlebars";
import "firebase-functions";
import algoliasearch from "algoliasearch";

admin.initializeApp();

import sendMail from "./sendgrid";
import sendSMS from "./twillio";

export const searchAlertNotifier = functions.pubsub.schedule(
    "every 1 hours"
).onRun(() => {
  // One hour ago timestamp
  const now = new Date();
  now.setHours(now.getHours() - 1);
  const oneHourAgoTS = now.getTime() / 1000;

  // Algolia client
  const searchClient = algoliasearch(
      functions.config().algolia.appid,
      functions.config().algolia.apikey,
  );

  // Query the Algolia indice, searching for recently added records (createdAt > 1 hour ago).
  const searchForNewResults = async (serializedQuery: string) => {
    const query = JSON.parse(serializedQuery);
    query.numericFilters = query?.numericFilters || [];
    query.numericFilters.push(`createdAt>${oneHourAgoTS}`);

    functions.logger.info("Query: ", query);

    return await searchClient.initIndex(functions.config().algolia.indexname).search("", query);
  };

  admin.firestore().collection("alerts").get().then((querySnapshot) => {
    // For each saved search:
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      functions.logger.info("Doc: ", data);
      
      // Check if new results available.
      const {hits, nbHits} = await searchForNewResults(data.query);
      functions.logger.info(`Hits (${nbHits}): `, hits);

      if (!hits.length) return; // No new results were found.

      // New results were found!
      // Let's build the notification's contents.
      const messageTitle = `${nbHits} new results for your saved search 🔎`;

      // Message contents using Handlebars
      const htmlTemplate = fs.readFileSync(path.resolve(__dirname,'./templates/template.html.hbs'), 'utf-8');
      const htmlTemplateHBS = handlebars.compile(htmlTemplate);

      const textTemplate = fs.readFileSync(path.resolve(__dirname,'./templates/template.txt.hbs'), 'utf-8');
      const textTemplateHBS = handlebars.compile(textTemplate);

      const templateData = {nbHits, hits};
      const messageContentHTML = htmlTemplateHBS(templateData);
      const messageContentText = textTemplateHBS(templateData);

      // Mail notification.
      if (data.email) {
        try {
          await sendMail(data.email, messageTitle, messageContentText, messageContentHTML);
        } catch (e) {
          functions.logger.error(e);
        }
      }

      // Text notification
      if (data.phone) {
        try {
          await sendSMS(data.phone, messageContentText);
        } catch (e) {
          functions.logger.error(e);
        }
      }
    });
  });
});
