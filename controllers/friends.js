const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  search,
  friendRequest,
  acceptRequest,
  rejectRequest,
  getFriends,
  deleteFriend,
  getMatches,
  shareRest,
};

function search(req, res) {
  console.log(req.params.id);
  User.find({name: new RegExp('^'+ req.params.query + '$', 'i')}, function(err, users) {
    if (err) console.log(err);
    // we only want to send back names and ids, as we don't want users to have access to likes
    let response = [];
    users.forEach(user => {
      // don't include users that match the current user
      if (user._id != req.params.id) {
        response.push({
          name: user.name,
          id: user._id
        });
      }
    });
    res.send(response);
  });
}

function friendRequest(req, res) {
  User.findById(req.body.id, function(err, user) {
    User.findById(req.body.friend, function(err, friend) {
      // we don't want to ask friends to be friends again
      if (user.pending.includes(req.body.friend)) {
        return res.send({
          message: 'this person already sent you a friend request!',
          severity: 'warning'
        });
      }
      if (friend.friends.includes(req.body.id)) {
        return res.send({
          message: 'you are already friends!',
          severity: 'warning'
        });
      }
      if (friend.pending.includes(req.body.id)) {
        return res.send({
          message: 'your request is already pending',
          severity: 'warning'
        });
      }
      pending = friend.pending;
      pending.push(req.body.id);
      User.findByIdAndUpdate(req.body.friend, {pending}, {new: true}, function(err, newFriend) {
        res.send({
          message: `Your friend request to ${friend.name} was sent!`,
          severity: 'success'
        });
      });
    });
  })
}

function acceptRequest(req, res) {
  User.findById(req.body.id, function(err, user) {
    // we don't want to allow duplicate acceptances
    if (user.friends.includes(req.body.friend)) {
      return res.send({
        message: 'this person is already your friend',
        severity: 'warning'
      });
    }
    let newPending = user.pending.filter(id => id != req.body.friend);
    let newFriends = [...user.friends, req.body.friend];
    User.findByIdAndUpdate(req.body.id, {
      pending: newPending,
      friends: newFriends
    }, {new: true}, function(err, newUser) {
      if (err) console.log(err);
      User.findById(req.body.friend, function(err, friend) {
        let friendFriends = [...friend.friends, req.body.id];
        let friendNotifications = [...friend.notifications, `${user.name} accepted your friend request!`];
        User.findByIdAndUpdate(req.body.friend, {friends: friendFriends, notifications: friendNotifications}, function(err, newFriend) {
          res.send({
            message: `${friend.name} has been added as a friend`,
            severity: 'success'
          });
        });
      });
    });
  });
}

function rejectRequest(req, res) {
  User.findById(req.body.id, function(err, user) {
    let newPending = user.pending.filter(pending => pending != req.body.pending);
    User.findByIdAndUpdate(req.body.id, {pending: newPending}, {new: true}, function(err, updatedUser) {
      if (err) console.log(err);
      res.send(updatedUser);
    });
  });
}

function getFriends(req, res) {
  User.findById(req.params.id)
  .populate('friends', 'name')
  .exec(function(err, user) {
    if (err) console.log(err);
    res.send(user.friends);
  })
}

function deleteFriend(req, res) {
  User.findById(req.body.id, function(err, user) {
    let newFriends = user.friends.filter(friend => friend != req.body.friend);
    User.findByIdAndUpdate(req.body.id, {friends: newFriends}, function(err, newUser) {
      if (err) console.log(err);
      User.findById(req.body.friend, function(err, friend) {
        let newFriends = friend.friends.filter(friend => friend != req.body.id);
        User.findByIdAndUpdate(req.body.friend, {friends: newFriends}, function(err, newFriend) {
          if (err) console.log(err);
          res.send(newFriend);
        });
      });
    });
  });
}

function getMatches(req, res) {
  if (req.params.friend == 0) return res.send([]);
  User.findById(req.params.id, function(err, user) {
    User.findById(req.params.friend, function(err, friend) {
      let matches = user.likes.filter(like => friend.likes.includes(like));
      res.send(matches);
    });
  });
}


function shareRest(req, res) {
  User.findById(req.body.friend, function(err, friend) {
    let newReccomendation = {
      name: req.body.name,
      rest: req.body.rest,
      restId: req.body.restId
    };
    let updatedRecommendations = [newReccomendation, ...friend.recommendations];
    User.findByIdAndUpdate(req.body.friend, {recommendations: updatedRecommendations}, function(err) {
      if (err) console.log(err);
      res.send({
        message: `${req.body.rest} was recommended to ${friend.name}`,
        severity: 'success'
      });
    });
  });
}
