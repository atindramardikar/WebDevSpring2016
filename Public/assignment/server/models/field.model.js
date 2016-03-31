var forms = require("./form.mock.json");
var q = require("q");

module.exports = function (db, mongoose, formModel) {

    var api = {
        addFieldToForm: addFieldToForm,
        deleteField: deleteField,
        findFieldbyId: findFieldbyId,
        updateField: updateField,
        fieldsForFormId: fieldsForFormId
    };

    return api;

    function addFieldToForm(formId, field) {
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    doc.fields.push(field);
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    doc.fields.id(fieldId).remove();
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;
    }

    function findFieldbyId(fields) {

    }


    function fieldsForFormId(formId) {
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(function (doc) {
                    deferred.resolve(doc);
                },
                // send error if promise rejected
                function (err) {
                    deferred.reject(err);

                });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    var newField = doc.fields.id(fieldId);
                    newField.label = field.label;
                    newField.placeholder = field.placeholder;
                    newField.type = field.type;
                    newField.options = field.options;
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;
    }
};