module.exports = function(app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function fieldsForFormId(req, res) {
        var formId = req.params.formId;
        fieldModel.fieldsForFormId(formId)
            .then(
            function ( doc ) {
                res.json(doc.fields);
            },
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }

    function getFieldById(req, res) {

    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(formId, fieldId)
        .then(
            function (doc) {
                res.send(200);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function addFieldToForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        fieldModel.addFieldToForm(formId, field)
            .then(
            function (doc) {
                //req.session.currentUser = doc;
                res.json(doc);
            },
            // send error if promise rejected
            function (err) {
                res.status(400).send(err);
            }

        );
    }

    function updateFieldById(req, res) {
        var field = req.body;
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        fieldModel.updateField(formId, fieldId, field)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};