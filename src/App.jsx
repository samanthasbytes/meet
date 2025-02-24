import React, { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
  return (
    <div>
      <CitySearch />
      <EventList />
      <NumberOfEvents />
    </div>
  );
};

export default App;
