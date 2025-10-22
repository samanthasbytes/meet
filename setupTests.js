/* eslint-disable no-undef */
import '@testing-library/jest-dom';

const originalError = console.error; // hides act() errors

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

jest.setTimeout(30000);

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
