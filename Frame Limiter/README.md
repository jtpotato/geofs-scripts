# GeoFS Frame Limiter

A simple userscript that limits the frame rate of GeoFS when the browser window/tab is not focused. This helps reduce CPU and GPU usage when you're not actively using the simulator.

## Features

- Automatically limits frame rate to 10 FPS when window loses focus
- Restores normal frame rate when window regains focus
- Displays console messages when frame rate changes

## Installation

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click [here](./GeoFS%20Frame%20Limiter.user.js) to install the script (TODO: Add direct installation link)
3. Navigate to GeoFS and the script will automatically activate

## How it Works

The script uses the browser's visibility API to detect when the GeoFS window loses focus. When this happens, it sets the viewer's target frame rate to 10 FPS. When you return to the window, it removes the frame rate limit, allowing GeoFS to run at full speed again.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements.

## License

[MIT License](LICENSE)
