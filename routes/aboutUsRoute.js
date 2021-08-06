const { baseUrl } = require('../config/config');
let express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    
    res.render('aboutUs', {
        title: "About Us | Veterinary Clinic",
        view: "aboutUs",
        baseUrl: baseUrl
    });
});

module.exports = router;