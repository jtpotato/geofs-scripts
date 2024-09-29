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

window.geofsFuel = {};
window.geofsFuel.currentFuel = 0;

setTimeout(function () {}, 1000);
