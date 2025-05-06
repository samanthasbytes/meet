import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  // feature 2, scenario 1
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;
    when('the list of events is displayed', async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('the details of each event should be hidden by default', async () => {
      await waitFor(() => {
        EventListItems.forEach((eventListItem) => {
          expect(eventListItem.querySelector('.details')).not.toBeInTheDocument();
        });
      });
    });
  });

  // feature 2, scenario 2
  test('User can expand an event to see details', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListItems;
    given('the list of events is displayed', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    when('the user clicks the "show details" button on an event', async () => {
      const user = userEvent.setup();

      let detailsBtn;
      await waitFor(() => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('show details');
      });
      await user.click(detailsBtn);
    });

    then('the event’s details should be visible', async () => {
      const details = EventListItems[0].querySelector('.details');
      expect(details).toBeInTheDocument();
    });
  });

  // feature 2, scenario 3
  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let AppDOM;
    let EventListItems;
    let detailsBtn;
    given('the event details are visible', async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('show details');
      });
      await user.click(detailsBtn);
      expect(EventListItems[0].querySelector('.details')).toBeInTheDocument();
    });

    when('the user clicks the "hide details" button on the same event', async () => {
      expect(detailsBtn.textContent).toBe('hide details');
      const user = userEvent.setup();
      await user.click(detailsBtn);
    });

    then('the event’s details should be hidden', () => {
      expect(EventListItems[0].querySelector('.details')).not.toBeInTheDocument();
      expect(detailsBtn.textContent).toBe('show details');
    });
  });
});
