const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Appointment extends Model {}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pet_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'appointment',
  }
);

module.exports = Appointment;