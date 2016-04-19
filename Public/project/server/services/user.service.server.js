var passport      = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    app.post('/api/project/login', login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', createUser);
    app.post('/api/project/user', createUser);
    app.get('/api/project/loggedin', loggedin);
    app.get('/api/project/user', findAllUsers);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);


//    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/client/#/profile',
            failureRedirect: '/project/client/#/login'
        }), function(req, res){
            console.log("hereee");
            res.send(200);
        });

    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect: '/project/client/#/profile',
                failureRedirect: '/project/client/#/login'
           }));

       var googleConfig = {
            clientID        : "318409769806-83d5avokaoh52o4ot3rgirdsp5g2fi16.apps.googleusercontent.com",
            clientSecret    : "TaBmTNEe1IxtFqRhSPbpkwXk",
            callbackURL     : "http://127.0.0.1:3000/auth/google/callback"
        };
    var facebookConfig = {
        clientID        : "1595960087361230",
        clientSecret    : "4062899a78e33b5ce2cde9cea4f8a429",
        callbackURL     : "http://127.0.0.1:3000/auth/facebook/callback"
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        console.log(user);
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            name:  names[0]+" "+names[1],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        //console.log(user);
                        return done(null, user);
                    } else {
                        console.log(profile.name.givenName + profile.name.familyName);
                        console.log(profile.emails[0].value);
                        var newGoogleUser = {
                            //lastName: profile.name.familyName,
                            name: profile.name.displayName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newGoogleUser);

                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    //console
                    //req.session.currentUser = user;
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }



    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        /*userModel
            .findUserById(user._id)
            .then(
                function (user) {*/
                    done(null, user);
               /* },
                function (err) {
                    done(err, null);
                }
            );*/
    }

    function findUserById(req, res)
    {
        var userId = req.params.id;
        var user = userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }



    function login(req, res)
    {
        var credentials= req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req,res){
        //console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
        //console.log(req.user);
        //res.json(req.session.currentUser);
    }



    function findAllUsers(req,res)
    {
        var users= userModel.findAllUsers()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        (userModel.deleteUserById(id))
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }




    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        userModel.updateUser(userId, user)
            .then(
                function(doc)
                {
                    req.session.currentUser = req.body;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function createUser(req,res)
    {
        var newUser = req.body;
        //console.log("call");
        userModel.findUserByEmail(newUser.email)
            .then(function(user){
                if(!user){
                    console.log("gonna create");
                    userModel.createUser(newUser)
                        .then(
                            function(doc){
                                req.session.currentUser = doc;
                                res.json(doc);
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                }
            else{
                    console.log("user exists");
                    res.json(null);
                }},
                function(err){

                    res.status(400).send(err);
                }
            )
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};
