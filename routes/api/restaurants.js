const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../../controllers/restaurants');

/*---------- Public Routes ----------*/
router.get('/detail/:id', restaurantsCtrl.detail);
router.get('/reviews/:id', restaurantsCtrl.reviews);
router.get('/top', restaurantsCtrl.topLikes);
router.get('/:id/:lat/:long/:offset', restaurantsCtrl.restaurants);

module.exports = router;