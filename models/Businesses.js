const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Businesses extends Model {}

Businesses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_address_ln1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_address_ln2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'businesses',
  }
);

module.exports = Businesses;
