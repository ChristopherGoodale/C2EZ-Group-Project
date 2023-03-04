const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Items extends Model {}

Items.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_description: {
      type: DataTypes.STRING,
    },
    item_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity_instock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    business_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'businesses',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'items',
  }
);

module.exports = Items;
