const { baseUrl } = require('../config/config');
let express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    
    res.render('services', {
        title: "Services | Veterinary Clinic",
        view: "services",
        baseUrl: baseUrl
    });
});

module.exports = router;