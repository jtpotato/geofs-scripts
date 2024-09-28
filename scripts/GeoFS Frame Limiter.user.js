// ==UserScript==
// @name         GeoFS Frame Limiter
// @namespace    GeoFS
// @version      1.0
// @description  Limits the frame rate of the GeoFS viewer to 1 frame per second when the window is not visible/focused.
// @author       jtpotato
// @match        https://*.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

// when the window is not visible/focused, set frame limiter.

function setFrameLimiter() {
  geofs.api.viewer.targetFrameRate = 1;
  console.log("[GeoFS Frame Limiter] Frame limiter set to 1 frame per second.");
}
function unsetFrameLimiter() {
  geofs.api.viewer.targetFrameRate = undefined;
  console.log("[GeoFS Frame Limiter] Frame limiter removed.");
}

window.addEventListener("blur", setFrameLimiter);
window.addEventListener("focus", unsetFrameLimiter);
