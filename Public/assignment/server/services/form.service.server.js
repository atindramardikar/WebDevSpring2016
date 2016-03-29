module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res) {
        var id = req.params.userId;
        //res.json(userForms);
        var userForms = formModel.findFormsByUserId(id)
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

    function getFormById(req, res) {
        var id = req.params.formId;
        var form = formModel.findFormById(id)
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

    function deleteFormById(req, res) {
        var id = req.params.formId;
        //res.send(200);
        formModel.deleteFormById(id)
            .then(
                function (doc) {
                    //req.session.currentUser = doc;
                    res.send(200);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        //res.json(formModel.createFormForUser(userId, form));
        var forms = formModel.createFormForUser(userId, form)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }

            );
    }

    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        formModel.updateForm(id, form);
        res.send(200);
    }
};