const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_price: {
      type: DataTypes.DECIMAL,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    seller_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'orders',
  }
);

module.exports = Orders;
