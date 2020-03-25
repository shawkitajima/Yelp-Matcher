const BASE_URL = '/api/restaurants';

export default {
    restaurants,
    detail,
    reviews,
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