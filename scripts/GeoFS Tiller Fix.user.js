// ==UserScript==
// @name         GeoFS Tiller Fix
// @namespace    GeoFS
// @version      1.0
// @description  Dampens the tiller at high speeds to avoid being out-of control on the runway.
// @author       jtpotato
// @match        https://*.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setInterval(function () {
    if (
      geofs.aircraft.instance.groundContact &&
      geofs.aircraft.instance.groundSpeed > 10
    ) {
      // console.log(controls.yaw);
      if (Math.abs(controls.yaw) > 4 / geofs.aircraft.instance.groundSpeed) {
        controls.yaw =
          (4 / geofs.aircraft.instance.groundSpeed) * Math.sign(controls.yaw);
      }
    }
  }, 6); // somewhat faster than framerate will be ok
})();
