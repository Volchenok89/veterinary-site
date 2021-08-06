const { baseUrl } = require('../config/config');
let express = require('express');
let router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Message = require('../models/Message');

router.get('/', async (req, res) => {

    if (req.session.user) {

        const messages = await Message.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        console.log(messages);

        res.render('admin', {
            title: "Admin Dashboard | Veterinary Clinic",
            baseUrl: baseUrl,
            isAdmin: true,
            messages: messages
        });
    }
    else {
        res.redirect('/admin/login');
    }
});

router.get('/messages', async (req, res) => {
    const messages = await Message.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.send(messages);
});

router.get('/products', async (req, res) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.send(products);
});

router.get('/orders', async (req, res) => {
    const orders = await Order.findAll({
        order: [
            ['id', 'DESC']
        ],
        include: Product
    });
    res.send(orders);
});

router.get('/appointments', async (req, res) => {
    const appointments = await Appointment.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.send(appointments);
});

router.post('/add-product', async (req, res) => {
    
    let product = await Product.findOne({
        where: {
            name: req.body.productName
        }
    });

    if (product != null) {
        product.update({
            quantity: product.dataValues.quantity + Number(req.body.productQty),
            price: req.body.productPrice
        });

        res.send({
            status: "success",
            action: "updated"
        })
    }
    else {
        Product.create({
            name: req.body.productName,
            image: req.body.productImage,
            price: req.body.productPrice,
            quantity: req.body.productQty,
        });

        res.send({
            status: 'success',
            action: "inserted"
        });
    }
});

router.get('/login', async (req, res) => {

    if (req.session.user) {
        res.redirect('/admin');
    }
    else {
        res.render('adminLogin', {
            title: "Admin Login | Veterinary Clinic",
            baseUrl: baseUrl
        });
    }
});

router.post('/login', async (req, res) => {

    const user = await User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password,
            userType: "admin"
        }
    });

    if (user == null) {
        res.send({
            status: "failure"
        });
    }
    else {
        req.session.user = user.dataValues;

        res.send({
            status: "success",
            dashboardUrl: baseUrl + "/admin"
        });
    }
});

router.get('/logout', async (req, res) => {

    req.session.destroy();
    res.redirect('/');
});

module.exports = router;