const BASE_URL = '/api/restaurants/';

export default {
    restaurants,
  };


function restaurants(lat, long, offset) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({lat, long, offset})
    }).then(res => res.json());
}
