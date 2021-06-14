# Saved search alerts with Firebase

This sample app shows how you can "save" a search. The app automatically notifies you when new matching items become available.
Saved searches are great for automating repetitive search queries, and to keep up to date with changing content.

## Features

With this sample app, you can:

- 💾 🔎 Save a search
- 🆕 📨 Automatically get notified about new items matching your saved search
- 🔄 🔎 Manually replay your saved search

## Demo (Try it yourself!)



## How to run the sample app locally

This sample application is written in JavaScript/TypeScript and has two parts:

- [A React front end](src)
- [Firebase Cloud Functions](functions) as a back end

### 1. Clone this repository

```bash
git clone https://github.com/algolia-samples/saved-search-alerts
```

Copy the file `.env.example` and rename it to `.env.`:

```bash
cp .env.example .env
```

### 2. Set up Algolia

To use this sample app, you need an Algolia account. If you don't have one already, [create an account for free](https://www.algolia.com/users/sign-up). Note your [Application ID](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/#application-id) and [API key](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/#application-id).

In the `.env` file, set the environment variables `REACT_APP_ALGOLIA_APP_ID` and `REACT_APP_ALGOLIA_API_KEY` to the values from your Algolia account.

```bash
REACT_APP_ALGOLIA_APP_ID=<replace-with-your-algolia-app-id>
REACT_APP_ALGOLIA_API_KEY=<replace-with-your-algolia-api-key>
```

### 3. Create your Algolia index and upload data

[Create and populate an index](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/).

The sample app expects the index records to have the following shape:

```json
{
  "surface": 285,
  "features": [
    "Air Conditioning", "Parking"
  ],
  "price": 4554,
  "picture": "https://images.unsplash.com/photo-1590725175785-de025cc60835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzYzMTJ8MHwxfHNlYXJjaHwxNzF8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNjIyNzA2MzU0&ixlib=rb-1.2.1&q=80&w=1080",
  "createdAt": 16232441080000, // UTC Timestamp
}
```

If you don't have any data yet, your can use [the provided data set from this repository](sample/real_estate_classified.json).

To upload your data, you can use the [Algolia dashboard](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-from-the-dashboard/) or use one of Algolia's [API clients](https://www.algolia.com/developers/#integrations).

After creating the index and uploading the data, set the environment variable `REACT_APP_ALGOLIA_INDEX_NAME` in the `.env` file:

```bash
REACT_APP_ALGOLIA_INDEX_NAME=<replace-with-your-algolia-index-name>
```

### 4. Set up your Firebase Database and Cloud Functions

[Setup Firebase](https://firebase.google.com/docs/web/setup) to be able to create your database and deploy your Cloud Functions.
In the `.env` file, set the `REACT_APP_FIREBASE_PROJECT_ID` and `REACT_APP_FIREBASE_API_KEY` environment variables:

```bash
REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
```

### 5. Setup and upload your [Firebase Cloud Function](https://firebase.google.com/docs/functions)

If you don't have it installed already, [install the Firebase CLI](https://firebase.google.com/docs/web/setup#install-cli-deploy).

Set up the environment configuration for your project.

For example, the environment for [Twillio SendGrid](https://www.twilio.com/sendgrid/email-api) and [Twillio](https://www.twilio.com/docs/sms/send-messages):

```bash
firebase functions:config:set \
algolia.appid="<your-algolia-app-id>" \
algolia.apikey="<your-algolia-api-key>" \
algolia.indexname="<your-algolia-index-name>" \
sendgrid.apikey="<your-sendgrid-index-name>" \
sendgrid.fromemail="<your-sendgrid-from-email>" \
twillio.accountsid="<your-twillio-account-sid>" \
twillio.authtoken="<your-twillio-auth-token>" \
twillio.fromnumber="<your-twillio-from-number>"
```

Deploy your Cloud Function:

```bash
firebase deploy --only functions
```

### 6. Build and start the application

**Requirements**: Node.js, at least version 14.

Install dependencies:

```bash
npm install
```

Run the app:
```bash
npm start
```

Go to [localhost:3000](http://localhost:3000)

### 7. Next steps

Some ideas of what to do next:
- Allow users to unsubscribe from a given search alert by adding an additional Cloud Function [triggered by an HTTP request](https://firebase.google.com/docs/functions/http-events#trigger_a_function_with_an_http_request).
- Allow users to replay their saved search from the application.

## Authors

- [@cdenoix](https://twitter.com/cdenoix)
