const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/like', usersCtrl.like);
router.post('/see', usersCtrl.see);
router.get('/likes/:id', usersCtrl.getLikes);
router.get('/seen/:id', usersCtrl.getSeen);


/*---------- Protected Routes ----------*/




module.exports = router;