const router = require('express').Router();
const { Items, Businesses } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newitem = await Items.create({
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_image: req.body.item_image,
      item_price: req.body.item_price,
      quantity_instock: req.body.quantity_instock,

      business_id: req.session.user_business,
    });

    res.status(200).json(newitem);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Items.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Items.update(
      {
        item_name: req.body.item_name,
        item_description: req.body.item_description,
        item_image: req.body.item_image,
        item_price: req.body.item_price,
        quantity_instock: req.body.quantity_instock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const items = await Items.findAll({
      include: [
        {
          model: Businesses,
        },
      ],
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id, {
      include: [
        {
          model: Businesses,
        },
      ],
    });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
