const router = require('express').Router();
const { Businesses } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBusiness = await Businesses.create({
      business_name: req.body.business_name,
      business_address_ln1: req.body.business_address_ln1,
      business_address_ln2: req.body.business_address_ln2,
      business_city: req.body.business_city,
      business_state: req.body.business_state,
      business_zip: req.body.business_zip,
      business_phone: req.body.business_phone,
    });

    res.status(200).json(newBusiness);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const newBusiness = await Businesses.update(
      {
        business_name: req.body.business_name,
        business_address_ln1: req.body.business_address_ln1,
        business_address_ln2: req.body.business_address_ln2,
        business_city: req.body.business_city,
        business_state: req.body.business_state,
        business_zip: req.body.business_zip,
        business_phone: req.body.business_phone,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(newBusiness);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const newBusiness = await Businesses.findAll();

    res.status(200).json(newBusiness);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(business);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const businessData = await Businesses.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!businessData) {
      res.status(404).json({ message: 'No business found with this id!' });
      return;
    }

    res.status(200).json(businessData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
