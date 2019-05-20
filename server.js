const nodemon = require('nodemon');
const express = require('express');

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
const app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));