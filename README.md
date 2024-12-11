# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Features
### **Feature 1: Filter Events By City**

**User Story:**

- As a user,
- I should be able to filter events by city,
- So that I can view events happening in my preferred location.

**Scenarios:**

1. **Given** the user hasn’t searched for a city, **when** they view the events page, **then** the app should show upcoming events from all cities.
2. **Given** the user is on the events page, **when** they type a city name in the search bar, **then** the app should display a list of suggestions for matching cities.
3. **Given** the user has searched for a city, **when** they select a city from the suggested list, **then** the app should display events from the selected city only.

### **Feature 2: Show/Hide Event Details**

**User Story:**

- As a user,
- I should be able to show or hide details of an event,
- So that I can view or minimize information as needed.

**Scenarios:**

1. **Given** the user is viewing a list of events, **when** the page loads, **then** each event element should be collapsed by default.
2. **Given** the user is viewing a collapsed event, **when** they click “Show Details,” **then** the event details should expand.
3. **Given** the user is viewing expanded event details, **when** they click “Hide Details,” **then** the event details should collapse.

### **Feature 3: Specify Number of Events**

**User Story:**

- As a user,
- I should be able to specify the number of events displayed,
- So that I can control the length of the event list.

**Scenarios:**

1. **Given** the user hasn’t specified a number, **when** they view the events page, **then** the app should display 32 events by default.
2. **Given** the user is on the events page, **when** they set a number in the “Number of Events” input, **then** the app should display that number of events.

### **Feature 4: Use the App When Offline**

**User Story:**

- As a user,
- I should be able to use the app when offline,
- So that I can access event information without an internet connection.

**Scenarios:**

1. **Given** the user has previously accessed the app online, **when** they go offline, **then** the app should display cached event data.
2. **Given** the user is offline, **when** they attempt to change search settings (city or number of events), **then** the app should show an error notification.

### **Feature 5: Add an App Shortcut to the Home Screen**

**User Story:**

- As a user,
- I should be able to add an app shortcut to my device’s home screen,
- So that I can quickly access the app.

**Scenarios:**

1. **Given** the user is on the app’s main page, **when** they choose the “Add to Home Screen” option, **then** the app should guide them through the installation process.
2. **Given** the user has successfully added the shortcut, **when** they view their device’s home screen, **then** the app icon should be visible and functional.

### **Feature 6: Display Charts Visualizing Event Details**

**User Story:**

- As a user,
- I should be able to view charts visualizing event details,
- So that I can better understand trends and statistics about the events.

**Scenarios:**

1. **Given** the user is viewing the events page, **when** they click on the “View Statistics” button, **then** the app should display a chart summarizing the number of upcoming events in each city.
2. **Given** the user is viewing a chart, **when** they interact with it (e.g., hover over data points), **then** the app should show additional information for those points.
