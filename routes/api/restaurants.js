const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../../controllers/restaurants');

/*---------- Public Routes ----------*/
router.get('/detail/:id', restaurantsCtrl.detail);
router.get('/reviews/:id', restaurantsCtrl.reviews);
router.get('/top', restaurantsCtrl.topLikes);
router.get('/search/:search/:lat/:long', restaurantsCtrl.searchRest)
router.get('/:id/:lat/:long/:offset/:location', restaurantsCtrl.restaurants);
router.post('/filter', restaurantsCtrl.filterSearch);

module.exports = router;