Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user opens the app
    When the list of events is displayed
    Then the details of each event should be hidden by default

  Scenario: User can expand an event to see details
    Given the list of events is displayed
    When the user clicks the "show details" button on an event
    Then the event’s details should be visible

  Scenario: User can collapse an event to hide details
    Given the event details are visible
    When the user clicks the "hide details" button on the same event
    Then the event’s details should be hidden
