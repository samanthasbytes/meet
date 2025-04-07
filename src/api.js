import mockData from './mock-data';

// maps over events array, creates new array with locations only
// the set object removes duplicates, while the spread operator (...) converts the set back into an array
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// checks if the access token is valid, if not, redirects to the auth URL
const checkToken = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

// if using localhost, mock data is returned, otherwise the actual data is fetched
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://ut0ceklc9h.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

// const getToken = async (code) => {
//   const encodeCode = encodeURIComponent(code);
//   const response = await fetch(
//     'https://ut0ceklc9h.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
//   );
//   const { access_token } = await response.json();
//   access_token && localStorage.setItem('access_token', access_token);

//   return access_token;
// };

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      'https://ut0ceklc9h.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  // outcome 1: no access token found in localStorage
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const response = await fetch('https://ut0ceklc9h.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url');
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
