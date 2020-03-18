import tokenService from './tokenService';
const BASE_URL = '/api/users/';

export default {
    signup,
    getUser,
    logout,
    login,
    like,
    getLikes,
    see,
    getSeen,
    removeLike
  };


function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  .then(({token}) => tokenService.setToken(token));
}
  
function getUser() {
  return tokenService.getUserFromToken();
}
  
function logout() {
  tokenService.removeToken();
}
  
function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function like(id, rest) {
  return fetch(BASE_URL + 'like', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({id, rest})
  })
  .then(res => res.json());
}

function getLikes(id) {
  return fetch(BASE_URL + '/likes/' + id).then(res => res.json());
}

function removeLike(id, rest) {
  return fetch(BASE_URL + 'likes/' + id + '/' + rest, {
    method: 'DELETE',
  })
  .then(res => res.json());
}

function see(id, rest) {
  return fetch(BASE_URL + 'see', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({id, rest})
  })
  .then(res => res.json());
}

function getSeen(id) {
  return fetch(BASE_URL + '/seen/' + id).then(res => res.json());
}