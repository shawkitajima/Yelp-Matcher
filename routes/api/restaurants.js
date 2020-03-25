const express = require('express');
const router = express.Router();
const restaurantCtrl = require('../../controllers/restaurants');

/*---------- Public Routes ----------*/
router.get('/detail/:id', restaurantCtrl.detail);
router.get('/reviews/:id', restaurantCtrl.reviews);
router.get('/:id/:lat/:long/:offset', restaurantCtrl.restaurants);

module.exports = router;