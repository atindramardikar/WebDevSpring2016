module.exports = function(app, userModel) {
        app.get('/api/assignment/user', userRouter);
        app.post('/api/assignment/user',createUser);
        app.get("/api/assignment/user/:id", findUserById);
        app.put("/api/assignment/user/:id", updateUser);
        app.delete("/api/assignment/user/:id", deleteUser);

    function userRouter(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            getUsers(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var credentials= {
            username: req.query.username,
            password: req.query.password
        }
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }


    function findUserByUsername(req, res){
        var user = userModel.findUserByUsername(credentials);
        res.json(user);
    }


    function getUsers(req,res){
        var users= userModel.getUsers()
            .then(
            function (doc) {
                res.json(doc);
            },
            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
            )
    }

    function createUser(req,res){
        var user = req.body;
        var cuser = userModel.createUser(user)
                // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    res.json(cuser);
                },

                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }

            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUser(userId, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUserById(id));
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId)
            .then(
            // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
            // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
        );
    }

};