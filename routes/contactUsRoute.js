const { baseUrl } = require('../config/config');
let express = require('express');
let router = express.Router();
const Message = require('../models/Message');

router.get('/', async (req, res) => {
    
    res.render('contactUs', {
        title: "Contact Us | Veterinary Clinic",
        view: "contactUs",
        baseUrl: baseUrl
    });
});

router.post('/', async (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let msg = req.body.msg;

    Message.create({
        username: name,
        email: email,
        body: msg
    });

    res.send({
        status: "success"
    });
});

module.exports = router;