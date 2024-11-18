// ==UserScript==
// @name         GeoFS B787 Fix
// @namespace    GeoFS
// @version      1.0
// @description  Attempts to fix the B787 in GeoFS
// @author       jtpotato
// @match        https://*.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

function sanitizeForJson(obj) {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    },
    2
  );
}

// ID of 787-10 is 3180

function logInitialDefiniton() {
  logInitialDefiniton = () => {};

  const definition = geofs.aircraft.instance.definition;
  // Only keep relevant properties to avoid circular references
  const relevantData = {
    flapsSteps: definition.flapsSteps,
    flapsPositions: definition.flapsPositions,
    VS0: definition.VS0,
    VS: definition.VS,
    VFE: definition.VFE,
    VNO: definition.VNO,
    VNE: definition.VNE,
  };

  console.info("Aircraft Definition:", definition);
  const json = sanitizeForJson(definition);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create download link
  console.log("Click this link to download the definition:", url);
}

setInterval(() => {
  if (geofs.aircraft.instance.id === "3180") {
    logInitialDefiniton();
    applyChanges();
  }
}, 1000);

function applyChanges() {
  // console.log("Changes applied.");
  let config = geofs.aircraft.instance.definition;
  // https://www.geo-fs.com/backend/aircraft    documentation
  // VS0 (number) Stall speed or minimum flight speed in landing configuration (Flaps extended)
  // VS (number) Stall speed or minimum steady flight speed for which the aircraft is still controllable
  // VFE (number) Maximum flap extended speed
  // VNO (number) Maximum structural cruising speed or maximum speed for normal operations
  // VNE (number) Never exceed speed")
  config.flapsSteps = 9;
  // degrees
  // Original flaps positions: [0, 1, 5, 10, 15, 17, 18, 20, 25, 30]
  const originalPositions = [0, 1, 5, 10, 15, 17, 18, 20, 25, 30];
  config.flapsPositions = originalPositions.map((x) => (x / 30) * 4);

  // fix autopilot PIDs
  config.autopilot = {
    // altitude
    pitchAnglePID: [0.002, 0.001, 0.01],
    elevatorPitchPID: [0.05, 0.0001, 1e-7],
    // heading
    bankAnglePID: [0.4, 0.002, 0.04],
    aileronsRollPID: [0.4, 0.001, 0.04],
    maxBankAngle: 30,

    // speed
    throttlePID: [0.1, 0, 0],
  };

  config.minimumSpeed = 180;
  config.tensorFactor = 0.06;

  let parts = config.parts;

  const aileronDistance = 20;

  parts.find((x) => x.name === "l_aileron").area = 14;
  parts.find((x) => x.name === "l_aileron").points.forceSourcePoint = [
    -aileronDistance,
    0,
    0,
  ];
  parts.find(
    (x) => x.name === "l_aileron"
  ).points.forceSourcePoint.worldPosition = [0, 0, 0];
  parts.find((x) => x.name === "r_aileron").area = 14;
  parts.find((x) => x.name === "r_aileron").points.forceSourcePoint = [
    aileronDistance,
    0,
    0,
  ];
  parts.find(
    (x) => x.name === "r_aileron"
  ).points.forceSourcePoint.worldPosition = [0, 0, 0];
  parts.find((x) => x.name === "elevator1").area = 12;
  parts.find((x) => x.name === "elevator2").area = 12;

  parts.find((x) => x.name === "rudder").area = 8;

  // fix the centre of lift
  parts.find((x) => x.name === "leftwing").points.forceSourcePoint = [11, 5, 1];
  parts.find(
    (x) => x.name === "leftwing"
  ).points.forceSourcePoint.worldPosition = [0, 0, 0];

  parts.find((x) => x.name === "rightwing").points.forceSourcePoint = [
    -11, 5, 1,
  ];
  parts.find(
    (x) => x.name === "rightwing"
  ).points.forceSourcePoint.worldPosition = [0, 0, 0];
}
