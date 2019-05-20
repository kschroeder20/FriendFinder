// get the friends data
const friends = require("../data/friends")

module.exports = function(app) {
    
    //get all friends
    app.get('/api/friends', (req, res, next) => {
        return res.json(friends);
    });

    // create new friend
    app.post("/api/friends", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        let newFriend = req.body;

        // make the scores integers
        for (let i = 0; i < newFriend.scores.length; i++) {
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }

        // Using a RegEx Pattern to remove spaces from newCharacter
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        let matchedFriend = {};
        let winningCount = 50;

        // loop through each friend
        friends.forEach(function (element) {
            // establish counter that will be used for game logic
            let counter = 0;
            
            // look at each score calculate the difference between user and stored friend
            for (let i = 0; i < element.scores.length; i++) {
                counter += Math.abs(newFriend.scores[i] - element.scores[i]);
            }
            // if the winning count is higher than the current difference between
            // user and stored friend, make the winning count the value of the counter
            // and make the matched friend the friend who has the lowest number
            if (winningCount > counter) {
                winningCount = counter;
                matchedFriend = element;
            }
        });
        // push the new friend into the exsisting friends array and
        // respond to the post request with the information of the 
        // matched friend
        friends.push(newFriend);
        res.json(matchedFriend);
    });
}