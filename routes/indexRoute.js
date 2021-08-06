const { baseUrl } = require('../config/config');
let express = require('express');
let router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
    
    res.render('index', {
        title: "Veterinary Clinic",
        view: "home",
        baseUrl: baseUrl
    });
});

router.post('/appointment', async (req, res) => {
    
    await Appointment.create({
        pet_category: req.body.petType,
        date_time: req.body.date + " " + req.body.time + ":00",
        detail: req.body.detail
    });

    res.send({
        status: "success"
    });
});

module.exports = router;