var users= require("./user.mock.json");

var q = require("q");

module.exports = function(db,mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        getUsers: getUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserById:findUserById,
        updateUser:updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {
                username: credentials.username,
                password: credentials.password
            },

            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {
                username: username
            },

            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function getUsers(){
        var deferred = q.defer();
        UserModel.find({},function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user){
        var deferred = q.defer();
        var emails=user.email.split(",");
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                doc.emails.push(emails);
                doc.save (function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });
        // return a promise
        return deferred.promise;
    }

    function deleteUserById(id){
        var deferred = q.defer();

        UserModel.remove({_id : id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUserById(userId){
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {

            if (err) {
                    deferred.reject(err);
                }
            else {
                    deferred.resolve(doc);
                }
        });

        return deferred.promise;
    }

    function updateUser(id,user){

        for (var u in users) {
            if (users[u]._id == id) {
                users[u] = user;
            }
        }
        return user;
    }
}