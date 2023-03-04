const router = require('express').Router();
const { Orders_Items } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const orderItems = await Orders_Items.create({
    item_id: req.body.item_id,
    quantity_purchased: req.body.quantity_purchased,
    order_id: req.body.order_id,
  });
  res.status(200).json(orderItems);
});

router.get('/', withAuth, async (req, res) => {
  try {
    const order_items = await Orders_Items.findAll();

    res.status(200).json(order_items);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const oiData = await Orders_Items.findAll({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(oiData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const orderItems = await Orders_Items.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderItems) {
      res.status(404).json({ message: 'No items found with this id!' });
      return;
    }

    res.status(200).json(orderItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const oiData = await Orders_Items.update(
      {
        item_id: req.body.item_id,
        quantity_purchased: req.body.quantity_purchased,
        order_id: req.body.order_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!oiData) {
      res.status(404).json({ message: 'No orders found with this id!' });
      return;
    }

    res.status(200).json(oiData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
