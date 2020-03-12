const request = require('request');

module.exports = {
    restaurants,
    detail
}

// function restaurants(req, res) {
//     res.send('yolo swag')
// }

function restaurants(req, res) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.YELP_KEY 
    };
    const options = {
        url: `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=32.8564736&longitude=-117.22752&open_now=true`,
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