const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  like,
  getLikes,
  removeLike,
  see,
  getSeen,
  search,
  friendRequest,
  acceptRequest,
  offset,
  getNotifications
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    // Send back a JWT instead of the user
    const token = createJWT(user);
    res.json({token});
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

function like(req, res) {
  console.log(req.body);
  User.findById(req.body.id, function(err, user) {
    let likes = user.likes;
    if (likes.includes(req.body.id)) {
      return res.send('already liked!')
    }
    likes.push(req.body.rest);
    User.findByIdAndUpdate(req.body.id, {likes}, {new: true}, function(err, newUser) {
      res.send(newUser);
    });
  });
}

function getLikes(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.send(user.likes);
  });
}

function removeLike(req, res) {
  console.log(req.params.rest);
  User.findById(req.params.id, function(err, user) {
    let likes = user.likes;
    let removed = likes.filter(like => like !== req.params.rest);
    console.log(removed);
    User.findByIdAndUpdate(req.params.id, {likes: removed}, {new: true}, function(err, newUser) {
      res.send(newUser);
    });
  });
}

function see(req, res) {
  User.findById(req.body.id, function(err, user) {
    let seen = user.seen;
    seen.push(req.body.rest);
    User.findByIdAndUpdate(req.body.id, {seen}, {new: true}, function(err, newUser) {
      res.send(newUser);
    });
  });
}

function getSeen(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.send(user.seen);
  });
}

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
  User.findById(req.body.friend, function(err, friend) {
    // we don't want to ask friends to be friends again
    if (friend.friends.includes(req.body.id)) {
      return res.send({message: 'already friended!'});
    }

    if (friend.pending.includes(req.body.id)) {
      return res.send({message: 'your request is already pending'});
    }

    pending = friend.pending;
    pending.push(req.body.id);
    User.findByIdAndUpdate(req.body.friend, {pending}, {new: true}, function(err, newFriend) {
      res.send({message: 'Friend Request Sent!'});
    });
  });
}

function acceptRequest(req, res) {
  User.findById(req.body.id, function(err, user) {
    // we don't want to allow duplicate acceptances
    if (user.friends.includes(req.body.friend)) {
      return res.send({message: 'already friended!'});
    }
    newPending = user.pending.filter(id => id != req.body.friend);
    newFriends = [...user.friends, req.body.friend];
    User.findByIdAndUpdate(req.body.id, {
      pending: newPending,
      friends: newFriends
    }, {new: true}, function(err, newUser) {
      if (err) console.log(err);
      User.findById(req.body.friend, function(err, friend) {
        friendFriends = [...friend.friends, req.body.id];
        User.findByIdAndUpdate(req.body.friend, {friends: friendFriends}, function(err, newFriend) {
          res.send({message: newUser.pending});
        });
      });
    });
  });
}

function offset(req, res) {
  User.findById(req.body.id, function(err, user) {
    let yelpOffset = parseInt(user.yelpOffset) + 50;
    User.findByIdAndUpdate(req.body.id, {yelpOffset}, function(err, newUser) {
      if (err) console.log(err);
      console.log(newUser.yelpOffset);
      res.send({message: 'mission accomplished'});
    })
  })
}

function getNotifications(req, res) {
  User.findById(req.params.id)
  .populate('pending', 'name')
  .exec(function(err, user) {
    let pending = user.pending;
    let notifications = user.notifications;
    res.send({pending, notifications});
  })
}

// Make helper functions for JWT

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
