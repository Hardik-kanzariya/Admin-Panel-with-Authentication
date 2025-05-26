const express = require('express');
const port = 9011;
const path = require('path');
const dbconnect = require("./config/dbconnection");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localSt = require('./config/passportStr');

const app = express();

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser()); 

app.use(session({
    name:'test',
    secret:'admin',
    resave: true,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);

// routes
app.use("/", require('./routes/index.routes'));


app.listen(port, () => { 
    console.log(`Server started at http://localhost:${port}`);
});



