const BASE_URL = '/api/restaurants';

export default {
    restaurants,
    detail,
    reviews,
    topLikes,
    search
};


function restaurants(lat, long, id) {
    return fetch(`${BASE_URL}/${id}/${lat}/${long}/0`).then(res => res.json());
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