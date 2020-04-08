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
  getNotifications,
  deleteNotification,
  deleteRecommendation,
  getRejections,
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
    if (likes.includes(req.body.rest)) {
      return res.send({message: 'already liked!'})
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

function getNotifications(req, res) {
  User.findById(req.params.id)
  .populate('pending', 'name')
  .exec(function(err, user) {
    let pending = user.pending;
    let notifications = user.notifications;
    let recommendations = user.recommendations
    res.send({pending, notifications, recommendations});
  })
}

function deleteNotification(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.notifications.splice(req.params.idx, 1);
    User.findByIdAndUpdate(req.params.id, {notifications: user.notifications}, function(err, newUser) {
      if (err) console.log(err);
      res.send({message: 'mission accomplished'});
    });
  });
}

function deleteRecommendation(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.recommendations.splice(req.params.idx, 1);
    User.findByIdAndUpdate(req.params.id, {recommendations: user.recommendations}, function(err, newUser) {
      if (err) console.log(err);
      res.send({message: 'mission accomplished'});
    });
  });
}

function getRejections(req,res) {
  User.findById(req.params.id, function(err, user) {
    let rejections = user.seen.filter(rest => !user.likes.includes(rest));
    res.send(rejections);
  });
}


// Make helper functions for JWT

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
