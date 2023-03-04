const router = require('express').Router();
const { Users, Businesses } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await Users.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_business = userData.business_id;
      req.session.logged_in = true;
      if (userData.business_id !== null) {
        req.session.user_type = 'seller';
      } else {
        req.session.user_type = 'buyer';
      }

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/buyer', async (req, res) => {
  try {
    const userData = await Users.create(req.body);

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_business = userData.business_id;
      req.session.logged_in = true;
      if (userData.business_id !== null) {
        req.session.user_type = 'seller';
      } else {
        req.session.user_type = 'buyer';
      }

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ADD WITH AUTH BACK
router.get('/', async (req, res) => {
  try {
    const usersData = await Users.findAll({
      include: [
        {
          model: Businesses,
        },
      ],
    });

    res.status(200).json(usersData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await Users.findByPk(req.params.id, {
      include: [
        {
          model: Businesses,
        },
      ],
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get('/email/:email', async (req, res) => {
  try {
    const userData = await Users.findOne({
      where: { email: req.params.email },
    });
    const user = userData.get({ plain: true });

    res.status(200).json({ user: user });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
