const Users = require('./Users');
const Items = require('./Items');
const Businesses = require('./Businesses');
const Orders = require('./Orders');
const Orders_Items = require('./Orders_Items');

Businesses.hasMany(Users, {
  foreignKey: 'business_id',
  onDelete: 'CASCADE',
});

Users.belongsTo(Businesses, {
  foreignKey: 'business_id',
});

Businesses.hasMany(Items, {
  foreignKey: 'business_id',
  onDelete: 'CASCADE',
});

Items.belongsTo(Businesses, {
  foreignKey: 'business_id',
});

Users.hasMany(Orders, {
  foreignKey: 'seller_id',
  onDelete: 'CASCADE',
});

Orders.belongsTo(Users, {
  foreignKey: 'seller_id',
});

Users.hasMany(Orders, {
  foreignKey: 'buyer_id',
  onDelete: 'CASCADE',
});

Orders.belongsTo(Users, {
  foreignKey: 'buyer_id',
});

Items.belongsToMany(Orders, {
  through: {
    model: Orders_Items,
    unique: false,
  },
});

Orders.belongsToMany(Items, {
  through: {
    model: Orders_Items,
    unique: false,
  },
});

module.exports = { Users, Items, Businesses, Orders, Orders_Items };
