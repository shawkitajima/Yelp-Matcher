const request = require('request');

module.exports = {
    restaurants,
    detail
}

function restaurants(req, res) {
    console.log(req.body);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.YELP_KEY 
    };
    const options = {
        url: `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${req.body.lat}&longitude=${req.body.long}&open_now=true&limit=50&offset=${req.body.offset}`,
        headers: headers
    };
    function callback(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            let parsed = JSON.parse(body);
            res.send(parsed.businesses)
        }
    }
    request(options, callback);
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