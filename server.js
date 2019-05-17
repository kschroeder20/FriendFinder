//const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemon = require('nodemon');
const members = require('./app/data/friends');

const express = require('express');
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

//get all members
app.get('/api/friends', (req, res, next) => {
    return res.json(members);
});

// create new member
app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newfriend = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

    //console.log(newfriend);

    members.push(newfriend);

    res.json(newfriend);

    console.log(members);
});


const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }

// // init middleware
// app.use(logger);

// //gets all members
// app.get('/api/friends', (req, res) => {
//     res.json(members);
// });

// // set a static folder
// app.use(express.static(path.join(__dirname, '/app/public')));

// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'home.html'));
// // });
// //check env variable of port 3000











// const server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//     var path = req.url;

//     switch (path) {
//         case '/':
//             return displayHome(path, req, res);
//         case '/survey':
//             return displaySurvey(path, req, res);;
//         default:
//             return display404(path, req, res);;
//     }
// }

// server.listen(PORT, function () {
//     console.log("Server is listening on PORT: " + PORT);
// });

// function displayHome(url, req, res) {
//     fs.readFile(__dirname + '/app/public/home.html', function (err, data) {
//         if (err) throw err;
//         res.writeHead(200, {
//             "Content-Type": "text/html"
//         });
//         res.end(data);
//     });
// }

// function displaySurvey(url, req, res) {
//     fs.readFile(__dirname + '/app/public/survey.html', function (err, data) {
//         if (err) throw err;
//         res.writeHead(200, {
//             "Content-Type": "text/html"
//         });
//         res.end(data)
//     });
// }

// function display404(url, req, res) {
//     var myHTML = "<html>" +
//         "<body><h1>404 Not Found </h1>" +
//         "<p>The page you were looking for: " + url + " can not be found</p>" +
//         "</body></html>";

//     // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
//     res.writeHead(404, {
//         "Content-Type": "text/html"
//     });

//     // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
//     res.end(myHTML);
// }