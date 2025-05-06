import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  // feature 3, scenario 1
  test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;

    given('the user hasn’t specified the number of events', () => {});

    when('they view the events page', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
      });
    });

    then('the app should display 32 events by default', () => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });

  // feature 3, scenario 2
  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;

    given('the user is on the events page', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
      });
    });

    let NumberOfEventsComponent;
    when('they set a number in the "number of events" input', async () => {
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      NumberOfEventsComponent = within(NumberOfEventsDOM);
      const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
      const user = userEvent.setup();
      await user.type(numberTextBox, '{backspace}{backspace}10');
      expect(numberTextBox.value).toBe('10');
    });

    then('the app should display that number of events', () => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(10);
    });
  });
});
