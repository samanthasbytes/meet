'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly'
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://meet-coral.vercel.app'];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      authUrl
    })
  };
};

module.exports.getAccessToken = async (event) => {
  // decode the authorization code from the URL
  const code = decodeURIComponent(event.pathParameters.code);

  // return a promise to handle async token fetching
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, token) => {
      if (error) {
        return reject({
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ error: error.message })
        });
      }

      // resolve with the token response
      return resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(token)
      });
    });
  });
};

module.exports.getCalendarEvents = async (event) => {
  // extract access token from path parameter
  const access_token = decodeURIComponent(event.pathParameters.access_token);

  // set the access token in the OAuth2 client
  oAuth2Client.setCredentials({ access_token });

  // return promise to fetch calendar events
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      },
      (error, response) => {
        if (error) {
          return reject({
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ error: error.message })
          });
        }

        return resolve({
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ events: response.data.items })
        });
      }
    );
  });
};
