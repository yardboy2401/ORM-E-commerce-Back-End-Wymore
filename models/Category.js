//sequelize Model/DataTypes require 
const { Model, DataTypes } = require('sequelize');

//require connection file for sequelize
const sequelize = require('../config/connection.js');

//create Category sequelize Model
class Category extends Model {}

//Category sequelize Model db table column parameters
Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

//export Category sequelize Model
module.exports = Category;
