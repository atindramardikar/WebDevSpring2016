var forms = require("./form.mock.json");
module.exports = function (uuid, formModel) {
    var api = {
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function createField(formId, field) {
        var form;
        field._id = uuid.v1();
        form = formModel.findFormById(formId);
        form.fields.push(field);
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
        var form;
        form = formModel.findFormById(formId);
        return form.fields;
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