var q = require("q");

module.exports = function (db,mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId
    };
    return api;

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.find({title : title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();

        FormModel.find({userId : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormById (id) {
        var deferred = q.defer();

        FormModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllForms () {
        var deferred = q.defer();

        FormModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById (id) {
        var deferred = q.defer();

        FormModel.remove({_id : id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createFormForUser (userId, newForm) {
        var nForm = {
            title: newForm.title,
            userId: userId,
            fields: [],
            created: new Date(),
            updated: new Date()
        };
        var deferred = q.defer();
        FormModel.create(nForm, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function updateForm (id, form) {
        var deferred = q.defer();
        FormModel.update({_id: id}, {title: form.title, updated: new Date()},function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

};