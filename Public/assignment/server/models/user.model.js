var users= require("./user.mock.json");

var q = require("q");

module.exports = function(db,mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        findAllUsers: getUsers,
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
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
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
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                deferred.resolve (doc);
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
        var deferred = q.defer();


        //console.log(id);

        UserModel.update({_id: id},
            {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                roles: user.roles
            }, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise\
                UserModel.findById(id, function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        //console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });
        // return a promise
        return deferred.promise;
    }
}