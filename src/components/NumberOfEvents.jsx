import React, { useState } from 'react';

// eslint-disable-next-line
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);

    let errorText;

    if (value === '') {
      errorText = '';
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      errorText = 'Please enter a valid number greater than 0';
    } else {
      setCurrentNOE(Number(value));
      errorText = '';
    }

    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
