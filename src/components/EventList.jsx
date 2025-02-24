/* eslint-disable react/prop-types */
// NOTE: missing props validation
import React from 'react';
import Event from './Event';

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};

export default EventList;
