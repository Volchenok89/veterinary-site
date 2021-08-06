const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        price: {
            type: DataTypes.FLOAT(2),
            defaultValue: 0
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
  }
);

module.exports = Product;