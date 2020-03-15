const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  like,
  getLikes,
  see,
  getSeen,
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



// Make helper functions for JWT

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
