module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res) {
        var id = req.params.userId;
        console.log(id);
        var userForms = formModel.findFormsByUserId(id);
        console.log(userForms);
        res.json(userForms);
    }

    function getFormById(req, res) {
        var id = req.params.formId;
        var forms = formModel.findFormById(id);
        res.json(forms);
    }

    function deleteFormById(req, res) {
        var id = req.params.formId;
        formModel.deleteFormById(id);
        res.send(200);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.createFormForUser(userId, form));
    }

    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        formModel.updateForm(id, form);
        res.send(200);
    }
};