[Lucky Number](https://en.wikipedia.org/wiki/Happy_number) generator in JavaScript.

A browser "cut-and-paste" friendly version of the Happy Number Generator in JavaScript is in `happy-number.js`. This file is a simple copy of the file in `static/happy.js` with the following modifications: a) the ES6 module keywords have been removed b) usage of the functions are added to the bottom of the file. The file is suitable for simple copy-and-paste into a browser JavaScript console for playing around. More extensive usage is shown in the `static/happy_ui.js` file where it drives the web UI.

> Note: The web app in `static` requires a static web server to properly load/run in a browser due to browser security restrictions. I highly recommend using `browser-sync` if you don't already have a static server available.

#### Browser Sync

If you need a static server and don't have one, follow these instructions to install and use browser-sync:

* [Install node.js](https://nodejs.org)
* On the command line run `npm i -g browser-sync` to install browser-sync.
* Change into the the project directory and type `browser-sync static -w` to serve the files in the `static` directory. Browser-sync should automatically open your default browser to the web page.
