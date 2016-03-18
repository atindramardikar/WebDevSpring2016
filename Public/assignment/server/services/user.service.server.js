module.exports = function(app) {
    console.log("hello");
        app.post('/api/assignment/user', findUserByCredentials);

            function findUserByCredentials(req, res) {
                    var credentials = req.body;
                    console.log("hii");
                    res.send(200);
                }
    }