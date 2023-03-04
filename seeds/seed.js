const sequelize = require('../config/connection');
const { Users, Businesses, Orders_Items, Items, Orders } = require('../models');

const userData = require('./userData.json');
const businessData = require('./businessData.json');
const itemData = require('./itemData.json');
const orderData = require('./orderData.json');
const order_itemsData = require('./order_itemsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const business of businessData) {
    await Businesses.create({
      ...business,
    });
  }
  for (const item of itemData) {
    await Items.create({
      ...item,
    });
  }

  await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const order of orderData) {
    await Orders.create({
      ...order,
    });
  }
  for (const order_item of order_itemsData) {
    await Orders_Items.create({
      ...order_item,
    });
  }

  process.exit(0);
};

seedDatabase();
