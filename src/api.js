import mockData from './mock-data';

// maps over events array, creates new array with locations only
// the set object removes duplicates, while the spread operator (...) converts the set back into an array
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// fetches list of events
export const getEvents = async () => {
  return mockData;
};
