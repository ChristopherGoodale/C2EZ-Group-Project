const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Users, Orders_Items, Orders, Items, Businesses } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.redirect('/login');
});

router.get('/orders/:id', async (req, res) => {
  try {
    const orderData = await Orders.findByPk(req.params.id, {
      include: [
        {
          model: Items,
          through: Orders_Items,
        },
      ],
    });

    const order = orderData.get({ plain: true });
    res.render('order', {
      ...order,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/store/:id', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    try {
      const storeItems = await Items.findAll({
        where: {
          business_id: req.session.user_business,
        },
      });
      const items = storeItems.map((item) => item.get({ plain: true }));
      const businessData = await Businesses.findByPk(req.session.user_business);
      const business = businessData.get({ plain: true });
      const orderID = req.params.id;
      const cartItems = await Orders.findByPk(orderID, {
        include: [
          {
            model: Users,
          },
          {
            model: Items,
            through: Orders_Items,
          },
        ],
        // ADDED TO SUM TOTAL
        attributes: {
          include: [
            [
              sequelize.literal(
                `(SELECT SUM(order_items.quantity_purchased*items.item_price) FROM order_items INNER JOIN items ON order_items.item_id = items.id WHERE order_id = ${orderID})`
              ),
              'totalCost',
            ],
          ],
        },
      });
      const citems = cartItems.get({ plain: true });
      res.render('store-layout', {
        items,
        citems,
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
        orderID,
        business,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/paid/:id', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    try {
      const businessData = await Businesses.findByPk(req.session.user_business);
      const business = businessData.get({ plain: true });
      const orderID = req.params.id;
      const cartItems = await Orders.findByPk(orderID, {
        include: [
          {
            model: Users,
          },
          {
            model: Items,
            through: Orders_Items,
          },
        ],
        // ADDED TO SUM TOTAL
        attributes: {
          include: [
            [
              sequelize.literal(
                `(SELECT SUM(order_items.quantity_purchased*items.item_price) FROM order_items INNER JOIN items ON order_items.item_id = items.id WHERE order_id = ${orderID})`
              ),
              'totalCost',
            ],
          ],
        },
      });
      const citems = cartItems.get({ plain: true });
      if (citems.paid === true) {
        res.render('paid-receipt', {
          citems,
          logged_in: req.session.logged_in,
          user_business: req.session.user_business,
          user_type: req.session.user_type,
          user_id: req.session.user_id,
          orderID,
          business,
        });
      } else {
        res.redirect(`/store/${orderID}`);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/store/1');
    return;
  }

  res.render('login');
});

router.get('/order/:oid/item/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const itemID = req.params.id;
      const item = await Items.findByPk(itemID, {
        include: [
          {
            model: Businesses,
          },
        ],
      });
      const individualItem = item.get({ plain: true });
      const businessData = await Businesses.findByPk(req.session.user_business);
      const business = businessData.get({ plain: true });
      const orderID = req.params.oid;
      const cartItems = await Orders.findByPk(orderID, {
        include: [
          {
            model: Items,
            through: Orders_Items,
          },
        ],
      });
      const citems = cartItems.get({ plain: true });
      res.render('individual-item', {
        individualItem,
        citems,
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
        orderID,
        itemID,
        business,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/items', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const items = await Items.findAll({
        include: [
          {
            model: Businesses,
          },
        ],
        where: { business_id: req.session.user_business },
      });
      const inventoryItems = items.map((item) => item.get({ plain: true }));
      res.render('inventory', {
        inventoryItems,
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/items/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const items = await Items.findByPk(req.params.id, {
        include: [
          {
            model: Businesses,
          },
        ],
      });
      const inventoryItem = items.get({ plain: true });
      res.render('inventoryItem', {
        inventoryItem,
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/sellerorders/', async (req, res) => {
  try {
    const orderBySeller = await Orders.findAll({
      where: {
        seller_id: req.session.user_id,
        paid: true,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
    const ordersBySeller = orderBySeller.map((item) =>
      item.get({ plain: true })
    );
    const openOrderBySeller = await Orders.findAll(
      {
        where: {
          seller_id: req.session.user_id,
          paid: false,
        },
      },
      {
        include: [
          {
            model: Items,
            through: Orders_Items,
          },
        ],
      }
    );
    const openOrdersBySeller = openOrderBySeller.map((item) =>
      item.get({ plain: true })
    );
    res.render('ordersBySeller', {
      ordersBySeller,
      openOrdersBySeller,
      logged_in: req.session.logged_in,
      user_business: req.session.user_business,
      user_type: req.session.user_type,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/', async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render('seller-history', {
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get('/purchasers/', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const Purchasers = await Users.findAll(
        {
          include: [
            {
              model: Orders,
            },
          ],
        },
        {
          where: {
            business_id: null,
          },
        }
      );

      let purchasers = Purchasers.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          business_id: user.business_id,
          orders: user.orders.splice(3),
        };
      });

      purchasers = Purchasers.map((user) => user.get({ plain: true }));
      res.render('all-buyers', {
        purchasers,
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/additem', async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render('addItem', {
        logged_in: req.session.logged_in,
        user_business: req.session.user_business,
        user_type: req.session.user_type,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
