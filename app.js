let express = require('express');
let expressSession = require('express-session');
let bodyParser = require('body-parser');
let hbs = require('hbs');
const sequelize = require('./config/connection.js');
const {User} = require("./models");

let indexRoute = require('./routes/indexRoute');
let aboutUsRoute = require('./routes/aboutUsRoute');
let servicesRoute = require('./routes/servicesRoute');
let pharmacyRoute = require('./routes/pharmacyRoute');
let contactRoute = require('./routes/contactUsRoute');
let adminRouter = require('./routes/adminRoute');

let app = express();

// Set HBS as templating engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
});
hbs.registerHelper('for', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Middlewares
app.use(express.json());
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', indexRoute);
app.use('/about-us', aboutUsRoute);
app.use('/services', servicesRoute);
app.use('/pharmacy', pharmacyRoute);
app.use('/contact-us', contactRoute);
app.use('/admin', adminRouter);

let PORT = process.env.PORT || 3000;

(async () => {
    // await sequelize.sync({ force: true });
    // console.log("Database created");


    app.listen(PORT, () => {
        console.log("Server listening on port " + PORT);
    });
    
})();