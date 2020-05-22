const BASE_URL = '/api/restaurants';

export default {
    restaurants,
    detail,
    reviews,
    topLikes,
    search,
    filter
};


function restaurants(lat, long, id, location) {
    return fetch(`${BASE_URL}/${id}/${lat}/${long}/0/${location}`).then(res => res.json());
}

function detail(id) {
    return fetch(`${BASE_URL}/detail/${id}`).then(res => res.json());
}

function reviews(id) {
    return fetch(`${BASE_URL}/reviews/${id}`).then(res => res.json());
}

function topLikes() {
    return fetch(`${BASE_URL}/top`).then(res => res.json());
}

function search(search, lat, long) {
    return fetch(`${BASE_URL}/search/${search}/${lat}/${long}`).then(res => res.json());
}

function filter(lat, long, category) {
    return fetch(`${BASE_URL}/filter`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({lat, long, category})
    }).then(res => res.json());
}