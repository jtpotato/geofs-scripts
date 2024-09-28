// ==UserScript==
// @name        GeoFS Autospoilers  // Name of the user script
// @namespace   GeoFS                 // Namespace identifier for the script
// @match       *://*.geo-fs.com/*    // Specifies the websites the script applies to
// @grant       none                  // No special privileges are requested
// @version     1.0                   // Current version of the script
// @author      jtpotato              // Author of the script
// @description Automatically arm spoilers, disables autopilot on touchdown and sets throttle to 0. // Description and date of creation
// ==/UserScript==

// Importing types for TypeScript support
/// <reference types="jquery" />
/// <reference types="@geps/geofs-types" />

// Function to wait for a condition to be true
async function waitForCondition(checkFunction) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (checkFunction()) {
        // Check if the condition is met
        clearInterval(intervalId); // Stop checking
        resolve(); // Resolve the promise
      }
    }, 100); // Check every 100 milliseconds
  });
}

// Function to wait until the UI is ready
async function waitForUI() {
  return waitForCondition(() => typeof ui !== "undefined"); // Checks if 'ui' is defined
}

// Function to wait until the aircraft instance is ready
async function waitForInstance() {
  return waitForCondition(() => geofs.aircraft && geofs.aircraft.instance); // Checks if aircraft instance exists
}

// Function to wait until the instruments are available
async function waitForInstruments() {
  return waitForCondition(
    () => instruments && geofs.aircraft.instance.setup.instruments // Checks if instruments are set up
  );
}

// Main function to handle the autospoilers functionality
async function autospoilers() {
  await waitForUI(); // Wait for the UI to be ready
  await waitForInstance(); // Wait for the aircraft instance to be ready

  // Show a notification about the new spoiler arming key
  ui.notification.show("Note: spoiler arming key has now changed to Shift.");

  // Initialize the spoiler arming status
  geofs.aircraft.instance.animationValue.spoilerArming = 0;

  // Function to toggle spoiler arming status
  const toggleSpoilerArming = () => {
    // Check if the aircraft is not on the ground and airbrakes are off
    if (
      !geofs.aircraft.instance.groundContact &&
      controls.airbrakes.position === 0
    ) {
      // Toggle the spoiler arming value between 0 and 1
      geofs.aircraft.instance.animationValue.spoilerArming =
        geofs.aircraft.instance.animationValue.spoilerArming === 0 ? 1 : 0;
    }
  };

  // Function to toggle airbrakes
  const toggleAirbrakes = () => {
    // Toggle airbrakes position between 0 and 1
    controls.airbrakes.target = controls.airbrakes.target === 0 ? 1 : 0;
    controls.setPartAnimationDelta(controls.airbrakes); // Update the animation delta
    geofs.aircraft.instance.animationValue.spoilerArming = 0; // Reset spoiler arming
  };

  // Define control setter for spoiler arming
  controls.setters.setSpoilerArming = {
    label: "Spoiler Arming", // Label for the control
    set: toggleSpoilerArming, // Function to execute when toggled
  };

  // Define control setter for airbrakes
  controls.setters.setAirbrakes = {
    label: "Air Brakes", // Label for the control
    set: toggleAirbrakes, // Function to execute when toggled
  };

  await waitForInstruments(); // Wait for the instruments to be available

  // Set up an overlay for the spoilers in the instruments
  instruments.definitions.spoilers.overlay.overlays[3] = {
    anchor: { x: 0, y: 0 }, // Position of the overlay
    size: { x: 50, y: 50 }, // Size of the overlay
    position: { x: 0, y: 0 }, // Initial position of the overlay
    animations: [
      { type: "show", value: "spoilerArming", when: [1] }, // Show conditions
      { type: "hide", value: "spoilerArming", when: [0] }, // Hide conditions
    ],
    class: "control-pad-dyn-label green-pad", // CSS class for styling
    text: "SPLR<br/>ARM", // Text to display on the overlay
    drawOrder: 1, // Draw order for layering
  };

  instruments.init(geofs.aircraft.instance.setup.instruments); // Initialize the instruments

  // Event listener for keyboard events
  $(document).keydown(function (e) {
    if (e.which === 16) {
      // Check if the "Shift" key is pressed
      console.log("Toggled Arming Spoilers"); // Log the action
      controls.setters.setSpoilerArming.set(); // Execute the toggle function
    }
  });

  // Interval to check conditions and update airbrakes and speed
  setInterval(function () {
    // Check if spoilers are armed and the aircraft is on the ground
    if (
      geofs.aircraft.instance.animationValue.spoilerArming === 1 &&
      geofs.aircraft.instance.groundContact &&
      controls.airbrakes.position === 0
    ) {
      controls.setters.setAirbrakes.set(); // Toggle airbrakes
      geofs.aircraft.instance.animationValue.spoilerArming = 0; // Reset spoiler arming
      geofs.autopilot.turnOff();
      geofs.aircraft.instance.engine.rpm = 1000; // Set throttle to 0
    }
  }, 100); // Run this check every 100 milliseconds

  // Interval to ensure instruments are set up correctly for specific aircraft IDs
  setInterval(function () {
    // Check if the aircraft ID is known and instruments are not initialized
    if (
      ["3292", "3054"].includes(geofs.aircraft.instance.id) &&
      geofs.aircraft.instance.setup.instruments["spoilers"] === undefined
    ) {
      geofs.aircraft.instance.setup.instruments["spoilers"] = ""; // Initialize spoilers instrument
      instruments.init(geofs.aircraft.instance.setup.instruments); // Reinitialize instruments
    }
  }, 500); // Run this check every 500 milliseconds
}

// Call the autospoilers function to start the script
autospoilers();
