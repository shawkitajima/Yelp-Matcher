const request = require('request');
const User = require('../models/user');

module.exports = {
    restaurants,
    detail,
    reviews
}


function restaurants(req, res) {
    User.findById(req.body.id, function(err, user) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.YELP_KEY 
        };
        const options = {
            url: `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${req.body.lat}&longitude=${req.body.long}&open_now=true&limit=50&offset=${user.yelpOffset}`,
            headers: headers
        };
        function callback(error, response, body) {
            if (error) console.log(error);
            if (!error && response.statusCode == 200) {
                let parsed = JSON.parse(body);
                let seen = new Set(user.seen);
                let results = parsed.businesses.filter(rest => !seen.has(rest.id))
                res.send(results);
            }
        }
        request(options, callback);
    })
}

function detail(req, res) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.YELP_KEY 
    };
    const options = {
        url: `https://api.yelp.com/v3/businesses/${req.params.id}`,
        headers: headers
    };
    function callback(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            let parsed = JSON.parse(body);
            res.send(parsed)
        }
    }
    request(options, callback);
}

function reviews(req, res) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.YELP_KEY 
    };
    const options = {
        url: `https://api.yelp.com/v3/businesses/${req.params.id}/reviews`,
        headers: headers
    };
    function callback(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            let parsed = JSON.parse(body);
            res.send(parsed)
        }
    }
    request(options, callback);
}