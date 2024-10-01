// ==UserScript==
// @name         GeoFS Fuel
// @namespace    GeoFS
// @version      1.0
// @description  Tries to add fuel to aircraft in GeoFS
// @author       jtpotato
// @match        https://*.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

// approximate fuel spent using engine RPM.
/**
 * @typedef {Object} GeoFSFuel
 * @property {number} currentFuel - The current amount of fuel in the aircraft.
 * @property {any} fuelData - An array of fuel data fetched from the remote JSON source.
 */

/** @type {GeoFSFuel} */
const geofsFuel = {
  currentFuel: 0,
  fuelData: null,
};

// fetch JSON data from
// https://raw.githubusercontent.com/jtpotato/geofs-scripts/refs/heads/main/data/fuel.json

async function fetchFuelData() {
  geofsFuel.fuelData = await fetch(
    "https://raw.githubusercontent.com/jtpotato/geofs-scripts/refs/heads/main/data/fuel.json"
  ).then((response) => response.json());
}

// Call the fetch function
fetchFuelData();

setTimeout(function () {
  const engineRPM = geofs.aircraft.instance.engine.rpm;
}, 1000);
