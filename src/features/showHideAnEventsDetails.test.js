// TODO:
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user opens the app', () => {});

    when('the list of events is displayed', () => {});

    then('the details of each event should be hidden by default', () => {});
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    given('the list of events is displayed', () => {});

    when('the user clicks the "show details" button on an event', () => {});

    then('the event’s details should be visible', () => {});
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    given('the event details are visible', () => {});

    when('the user clicks the "hide details" button on the same event', () => {});

    then('the event’s details should be hidden', () => {});
  });
});
