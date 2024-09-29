# jtpotato's GeoFS Scripts

**Designed for use through Tampermonkey/Greasemonkey/Violentmonkey.**

## Scripts Included

### Autospoilers

- Built off of NVB9's Autospoilers bookmarklet.
- Allows spoilers to be armed before landing.

On landing:

- Sets autopilot speed to 0.
- Disables autopilot a few milliseconds afterwards.

_Suggestion: Engage autoland/ILS approach, then arm spoilers and ensure mouse control is disabled. Configure aircraft with flaps/landing gear. Do not use brakes. Set target speed to whatever your aircraft's approach speed is. When the aircraft is close enough to the runway, reduce the target speed on the autopilot (this speed is probably a stall speed, but the aircraft probably won't stall before it hits the ground). On landing, use whatever keys you have configured for rudder control. The yaw will be gentle before the nosewheel touches the ground, and extremely aggressive afterwards. Activate brakes after nosewheel touches the ground._

### Crosshair

- A crosshair in the centre of the screen helps you know where the "zero" position is
- For mouse yoke users.

### Frame Limiter

- When flying long-haul or doing something else instead of focusing on the GeoFS window, this script limits the framerate to 10 fps when the game is not in focus.
- FPS is uncapped otherwise.
- 10 fps is the limit as lower framerates cause issues with physics and movement speeds.

---

## Stuff I have planned

- System notifications when waypoints are reached

---

## Stuff I don't maintain/use anymore

### GeoFS Tiller Fix

- Some aircraft are extremely sensitive to yaw movement when landing with the built-in autoland.
- This script prevents autopilot from using too much yaw.
- Now that I don't use autoland to centre the aircraft on the runway, this script is no longer necessary.
