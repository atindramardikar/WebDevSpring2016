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
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }


    function findAllUsers(req,res)
    {
        var users= userModel.findAllUsers();
        res.json(users);
    }

    function createUser(req,res)
    {
        var newUser = req.body;
        var user = userModel.createUser(newUser);
        res.json(user);
    }

    function deleteUserById(req, res)
    {
        var id = req.params.id;
        res.json(userModel.deleteUserById(id));
    }

    function updateUser(req, res)
    {
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUser(userId, user));
    }




};