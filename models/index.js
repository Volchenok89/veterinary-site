const Appointment = require('./Appointment');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const Message = require('./Message');

Order.belongsTo(Product, {foreignKey: 'product_id'});
Product.hasMany(Order, {foreignKey: 'product_id'});

module.exports = {
    Appointment, Product, User, Order, Message
};