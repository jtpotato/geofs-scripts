// ==UserScript==
// @name         GeoFS Crosshair
// @namespace    GeoFS
// @version      1.0
// @description  Adds a crosshair to the page, so you know where the centre is for the mouse yoke.
// @author       jtpotato
// @match        https://*.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Create SVG crosshair element
  const svgCrosshair = `
      <svg id="crosshair" width="100" height="100" style="position: absolute; pointer-events: none; z-index: 9999;">
          <line x1="50" y1="0" x2="50" y2="100" stroke="lime" stroke-width="8" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="lime" stroke-width="8" />
      </svg>
  `;

  // append svg to "geofs-indicators-container" div
  const container = document.getElementsByClassName(
    "geofs-indicators-container"
  )[0];

  container.insertAdjacentHTML("beforeend", svgCrosshair);

  const crosshair = document.getElementById("crosshair");
  crosshair.style.scale = "0.2";
  // set blending so that it's always visible regardless of background
  // crosshair.style.mixBlendMode = "difference";

  const positionCrosshair = () => {
    const div = document.getElementById("geofs-ui-3dview");
    if (div) {
      const divRect = div.getBoundingClientRect();
      const centerX = divRect.left + divRect.width / 2 - 50; // Center X adjusted for SVG width
      const centerY = divRect.top + divRect.height / 2 - 50; // Center Y adjusted for SVG height

      crosshair.style.left = centerX + "px";
      crosshair.style.top = centerY + "px";
    }
  };

  // Position the crosshair initially
  positionCrosshair();

  // Optionally, adjust crosshair position on window resize
  window.addEventListener("resize", positionCrosshair);
  // Call the function again if the layout of the div changes
  const observer = new MutationObserver(positionCrosshair);
  const targetNode = document.getElementById("geofs-ui-3dview");
  if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
  }

  // if the class "geofs-uiNone" is active on body, hide the crosshair. poll every 100ms
  const hideCrosshair = () => {
    if (document.body.classList.contains("geofs-uiNone")) {
      crosshair.style.display = "none";
    } else {
      crosshair.style.display = "block";
    }
  };

  setInterval(hideCrosshair, 100);
})();
