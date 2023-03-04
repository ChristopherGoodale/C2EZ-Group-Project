const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Orders_Items extends Model {}

Orders_Items.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items',
        key: 'id',
      },
    },
    quantity_purchased: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'order_items',
  }
);

module.exports = Orders_Items;
