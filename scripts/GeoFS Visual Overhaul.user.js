// ==UserScript==
// @name         GeoFS Visual Overhaul
// @namespace    GeoFS
// @version      1.0
// @description  Extra visual effects for GeoFS
// @author       jtpotato
// @match        https://*.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

// wait for geofs.api to be defined
async function visualOverhaulMain() {
  await new Promise((resolve) => {
    setInterval(() => {
      if (geofs && geofs.api) {
        resolve();
      }
    }, 200);
  });

  console.log("GeoFS Visual Overhaul loaded");

  const viewer = geofs.api.viewer;
}

visualOverhaulMain();
