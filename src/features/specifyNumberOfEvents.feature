Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user hasn’t specified the number of events
    When they view the events page
    Then the app should display 32 events by default

  Scenario: User can change the number of events displayed
    Given the user is on the events page
    When they set a number in the "number of events" input
    Then the app should display that number of events
