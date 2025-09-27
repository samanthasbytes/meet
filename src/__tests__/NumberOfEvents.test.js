import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents.jsx';
import App from '../App.jsx';

// unit tests
describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(
    () => (NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />))
  );

  test('renders a textbox', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('text box has a default value of 32', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox.value).toBe('32');
  });

  test('value of the textbox changes when user types in it', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(numberTextBox, '{backspace}{backspace}10');
    expect(numberTextBox.value).toBe('10');
  });
});

// integration tests
describe('<NumberOfEvents /> integration', () => {
  test('number of events rendered matches the number of events inputted by the user', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

    const user = userEvent.setup();
    await user.type(NumberOfEventsInput, '{backspace}{backspace}10');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    expect(allRenderedEventItems.length).toBe(10);
  });
});
