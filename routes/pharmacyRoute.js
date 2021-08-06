const { baseUrl } = require('../config/config');
let express = require('express');
let router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    
    res.render('onlinePharmacy', {
        title: "Online Pharmacy | Veterinary Clinic",
        view: "pharmacy",
        baseUrl: baseUrl
    });
});

router.get('/products', async (req, res) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.send(products);
});

router.post('/checkout', async (req, res) => {
    const cart = req.body.cart;
    const shippingAddress = req.body.shippingAddress;

    console.log(req.body);

    cart.forEach(async (product, index) => {
        await Order.create({
            product_id: product.id,
            quantity: product.quantity,
            shippingAddress: shippingAddress
        });

        let p = await Product.findOne({
            where: {
                id: product.id
            }
        });

        p.update({
            quantity: p.quantity - product.quantity
        });
    });

    res.send({
        status: "success"
    });
});

module.exports = router;