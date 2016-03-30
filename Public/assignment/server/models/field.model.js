var forms = require("./form.mock.json");
var q = require("q");

module.exports = function (db, mongoose, formModel) {

    //var FormSchema = require("./form.schema.server.js")(mongoose);
    //var FormModel = mongoose.model('form', FormSchema);

    var api = {
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function createField(formId, field) {
        formModel.createField(formId, field);
    }

    function deleteField(formId, fieldId) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                fields.splice(f, 1);
            }
        }
    }

    function findField(formId, fieldId) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                return fields[f];
            }
        }
    }

    function findFieldsByFormId(formId) {
        formModel.findFormById(formId)
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

    function updateField(formId, fieldId, field) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                fields[f] = field;
            }
        }
    }

};