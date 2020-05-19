const express = require('express');
const router = express.Router();
const friendsCtrl = require('../../controllers/friends');


router.get('/search/:id/:query', friendsCtrl.search);
router.post('/request', friendsCtrl.friendRequest);
router.post('/accept', friendsCtrl.acceptRequest);
router.delete('/pending', friendsCtrl.rejectRequest);
router.delete('/friend', friendsCtrl.deleteFriend);
router.get('/details/:id/:friend', friendsCtrl.getDetails);
router.post('/share', friendsCtrl.shareRest);
router.get('/:id', friendsCtrl.getFriends);

module.exports = router;