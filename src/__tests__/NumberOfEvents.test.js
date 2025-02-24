import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents.jsx';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => (NumberOfEventsComponent = render(<NumberOfEvents />)));

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
