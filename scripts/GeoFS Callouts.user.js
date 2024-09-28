// ==UserScript==
// @name        GeoFS Callouts  // Name of the user script
// @namespace   GeoFS                 // Namespace identifier for the script
// @match       *://*.geo-fs.com/*    // Specifies the websites the script applies to
// @grant       none                  // No special privileges are requested
// @version     1.0                   // Current version of the script
// @author      jtpotato              // Author of the script
// @description Adds radioaltimeter callouts to GeoFS // Description and date of creation
// ==/UserScript==

// global variable that will persist state
var geofsCallouts = {};
geofsCallouts.calloutsEnabled = false;

// callouts activate when aircraft is over 2500 feet, and deactivate when on the ground.

function shouldEnableCallouts() {
  var altitude = geofs.aircraft.instance.relativeAltitude;
  if (altitude > 2500) {
    geofsCallouts.calloutsEnabled = true;
  }

  if (geofs.aircraft.instance.groundContact) {
    geofsCallouts.calloutsEnabled = false;
  }
}

// set of possible callouts that can be called
geofsCallouts.altimeterCallouts = {
  2500: false,
  1000: false,
  500: false,
  400: false,
  300: false,
  200: false,
  100: false,
  50: false,
  40: false,
  30: false,
  20: false,
  10: false,
  5: false,
};

setInterval(function () {
  shouldEnableCallouts();
}, 500);
