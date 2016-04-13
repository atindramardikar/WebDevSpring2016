module.exports = function(app, userModel) {
    app.get('/api/project/user', userRouter);
    app.post('/api/project/user',createUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);

    function userRouter(req, res)
    {
        if (req.query.email && req.query.password)
        {
            findUserByCredentials(req, res);
        }
        else
        {
            findAllUsers(req, res);
        }
    }

    function findUserByCredentials(req, res)
    {
        var credentials=
        {
            email: req.query.email,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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

    function createUser(req,res)
    {
        var newUser = req.body;
        var user = userModel.createUser(newUser)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res)
    {
        var id = req.params.id;
        userModel.deleteUserById(id)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res)
    {
        var user = req.body;
        var userId = req.params.id;
        userModel.updateUser(userId, user)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }




};