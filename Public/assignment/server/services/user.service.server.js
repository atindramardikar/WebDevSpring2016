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
        var user = userModel.findUserByCredentials(credentials);
        console.log(user);
        res.json(user);
    }

    function findUserByUsername(req, res){
        var user = userModel.findUserByUsername(credentials);
        res.json(user);
    }

    function getUsers(req,res){
        var users= userModel.getUsers();
        res.json(users);
    }

    function createUser(req,res){
        var newUser = req.body;
        var user = userModel.createUser(newUser);
        res.json(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        console.log(user.username + userId);
        res.json(userModel.updateUser(userId, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUserById(id));
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

};