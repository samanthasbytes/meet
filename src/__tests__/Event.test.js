import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let allEvents;
  let EventComponent;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('renders event title', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test('renders event details button with the title "show details"', () => {
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  // STEP 5

  test("by default, event's details section should be hidden", () => {
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const button = EventComponent.queryByText('show details');
    const user = userEvent.setup();
    await user.click(button);
    expect(
      EventComponent.container.querySelector('.details')
    ).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const button = EventComponent.queryByText('show details');
    const user = userEvent.setup();
    await user.click(button);
    const hideButton = EventComponent.queryByText('hide details');
    await user.click(hideButton);
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
  });
});
