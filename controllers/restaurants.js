const request = require('request');
const User = require('../models/user');

module.exports = {
    restaurants,
    detail,
    reviews,
    topLikes,
    searchRest,
    filterSearch,
}

function restaurants(req, res) {
    User.findById(req.params.id, function(err, user) {
        let url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${req.params.lat}&longitude=${req.params.long}&open_now=true&limit=50&offset=${req.params.offset}`;
        if (req.params.location !== 'undefined') {
            url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${req.params.location}&open_now=true&limit=50&offset=${req.params.offset}`;
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.YELP_KEY 
        };
        const options = {
            url,
            headers: headers
        };
        function callback(error, response, body) {
            if (error) console.log(error);
            let parsed = JSON.parse(body);
            if (parsed.error && parsed.error.code === 'LOCATION_NOT_FOUND') res.send({message: 'invalid location'});
            if (!error && response.statusCode == 200) {
                let seen = new Set(user.seen);
                let results = parsed.businesses.filter(rest => !seen.has(rest.id))
                if (!results.length) {
                    let newOffset = parseInt(req.params.offset) + 50;
                    return res.redirect(`/api/restaurants/${req.params.id}/${req.params.lat}/${req.params.long}/${newOffset}`);
                }
                res.send(results);
            }
        }
        request(options, callback);
    });
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

function topLikes(req, res) {
    User.find({}, function(err, users) {
        // concatenate all of the likes together
        let allLikes = [];
        users.forEach(user => {
            allLikes = [...allLikes, ...user.likes];
        })
        // make an object that counts each instance of the likes
        let counter = allLikes.reduce((acc, like) => {
            acc[like] ? acc[like] += 1 : acc[like] = 1;
            return acc;
        }, {});
        // now we can make an array of objects, where the objects will have two properties: like, count
        let likeArr = [];
        Object.keys(counter).forEach(id => {
            likeArr.push({
                like: id,
                count: counter[id],
            });
        });
        // let's sort that likeArry by count
        likeArr.sort((a, b) => (b.count - a.count));
        // Let's go ahead and limit the number to 20
        let sliced = likeArr.slice(0, 20);
        res.send(sliced);
    })
}


function searchRest(req, res) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.YELP_KEY 
    };
    const options = {
        url: `https://api.yelp.com/v3/businesses/search?term=${req.params.search}&latitude=${req.params.lat}&longitude=${req.params.long}&limit=5&categories=food`,
        headers: headers
    };
    function callback(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            let parsed = JSON.parse(body);
            let results = parsed.businesses;
            res.send(results);
        }
    }
    request(options, callback);
}

function filterSearch(req, res) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.YELP_KEY 
    };
    const options = {
        url: `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${req.body.lat}&longitude=${req.body.long}&limit=20&categories=${req.body.category}`,
        headers: headers
    };
    function callback(error, response, body) {
        if (error) console.log(error);
        if (!error && response.statusCode == 200) {
            let parsed = JSON.parse(body);
            let results = parsed.businesses;
            res.send(results);
        }
    }
    request(options, callback);
}