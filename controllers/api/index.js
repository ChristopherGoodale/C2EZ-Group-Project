const router = require('express').Router();
const userRoutes = require('./userRoutes');
const businessRoutes = require('./businessRoutes');
const itemRoutes = require('./itemRoutes');
const orderRoutes = require('./orderRoutes');
const oiRoutes = require('./orderItemsRoutes');

router.use('/users', userRoutes);
router.use('/businesses', businessRoutes);
router.use('/items', itemRoutes);
router.use('/orders', orderRoutes);
router.use('/oi', oiRoutes);

module.exports = router;
