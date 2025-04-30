/* eslint-disable no-undef */
import '@testing-library/jest-dom';

// hides act() errors
const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to') &&
      args[0].includes('was not wrapped in act')
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// sets jest timeout to 30 seconds
jest.setTimeout(30000);
