const BASE_URL = '/api/restaurants';

export default {
    restaurants,
    detail,
    reviews
  };


function restaurants(lat, long, id) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({lat, long, id})
    }).then(res => res.json());
}

function detail(id) {
    return fetch(`${BASE_URL}/detail/${id}`).then(res => res.json());
}

function reviews(id) {
    return fetch(`${BASE_URL}/reviews/${id}`).then(res => res.json());
}