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
router.get('/notifications/:id', usersCtrl.getNotifications);
router.delete('/notifications/:id/:idx', usersCtrl.deleteNotification);
router.delete('/recommendations/:id/:idx', usersCtrl.deleteRecommendation);

/*---------- Protected Routes ----------*/




module.exports = router;