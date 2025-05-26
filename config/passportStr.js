const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/admin.model');


passport.use(
    new LocalStrategy(
        {usernameField: 'email', },
        async (email, password, done) => {
            let adminRec = await Admin.findOne({ email});
            if (adminRec) {
                if(password == adminRec.password){
                    done(null, adminRec);
                }else{
                    done(null, false, );
                }
            }else{
                done(null, false,);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let adminRec = await Admin.findById(id);
    done(null, adminRec);
});

passport.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else {
    res.redirect('/');
    }
}

passport.setAuthenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
    res.locals.user = req.user;        
    }
    next();
}


module.exports = passport;