const router = require('express').Router();
const { Orders, Items, Orders_Items } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newOrder = await Orders.create({
      order_price: req.body.order_price,
      payment_method: req.body.payment_method,
      buyer_id: req.body.buyer_id,
      seller_id: req.session.user_id,
      paid: req.body.paid,
    });

    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Orders.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No orders found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Orders.update(
      {
        order_price: req.body.order_price,
        payment_method: req.body.payment_method,
        buyer_id: req.body.buyer_id,
        // CHANGE TO PULL FROM LOGGED IN USER ID
        seller_id: req.body.seller_id,
        paid: req.body.paid,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!itemData) {
      res.status(404).json({ message: 'No orders found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: Items,
          through: Orders_Items,
        },
      ],
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const orderData = await Orders.findByPk(req.params.id, {
      include: [
        {
          model: Items,
          through: Orders_Items,
        },
      ],
    });

    res.status(200).json(orderData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
