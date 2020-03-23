const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/like', usersCtrl.like);
router.post('/see', usersCtrl.see);
router.get('/likes/:id', usersCtrl.getLikes);
router.delete('/likes/:id/:rest', usersCtrl.removeLike);
router.get('/seen/:id', usersCtrl.getSeen);
router.get('/search/:id/:query', usersCtrl.search);
router.post('/friends/request', usersCtrl.friendRequest);
router.post('/friends/accept', usersCtrl.acceptRequest);
router.delete('/pending', usersCtrl.rejectRequest);
router.post('/offset', usersCtrl.offset);
router.get('/notifications/:id', usersCtrl.getNotifications);


/*---------- Protected Routes ----------*/




module.exports = router;