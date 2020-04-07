const BASE_URL = '/api/friends/';

export default {
    search,
    request,
    acceptRequest,
    rejectRequest,
    getFriends,
    deleteFriend,
    getMatches,
    share,
  };

function search(id, query) {
  return fetch(BASE_URL + 'search/' + id + '/' + query).then(res => res.json());
}

function request(id, friend) {
  return fetch(BASE_URL + 'request', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({id, friend})
  })
  .then(res => res.json());
}

function acceptRequest(id, friend) {
  return fetch(BASE_URL + 'accept', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({id, friend})
  })
  .then(res => res.json());
}

function rejectRequest(id, pending) {
  return fetch(BASE_URL + 'pending', {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({id, pending})
  })
  .then(res => res.json());  
}

function getFriends(id) {
  return fetch(BASE_URL + id).then(res => res.json());
}

function deleteFriend(id, friend) {
  return fetch(BASE_URL + 'friend', {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({id, friend})
  })
  .then(res => res.json()); 
}

function getMatches(id, friend) {
  return fetch(BASE_URL + 'matches/' + id + '/' + friend).then(res => res.json());
}

function share(friend, name, rest, restId) {
  return fetch(BASE_URL + 'share', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({friend, name, rest, restId})
  })
  .then(res => res.json()); 
}