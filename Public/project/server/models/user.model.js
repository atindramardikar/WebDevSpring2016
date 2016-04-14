var q = require('q');

module.exports = function(db, mongoose) {

    var UserSchema = require('./user.schema.server.js')(mongoose);
    // create user model from schema
    var UserModel = mongoose.model('project.eventScheduler.user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser:updateUser,
        findUserByEmail: findUserByEmail,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function findUserByEmail(email)
    {
        var deferred = q.defer();
        UserModel.findOne({email:email},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({email:credentials.email, password:credentials.password},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers()
    {
        var deferred = q.defer();
        UserModel.find(function(err,doc){
            if(err){
                return deferred.reject(err);
            }
            else{
                return deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function createUser(newUser){
        var deferred = q.defer();
        UserModel.create(newUser, function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(id){
       var deferred = q.defer();
        UserModel.remove({_id:id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function updateUser(id,user){
       var deferred = q.defer();
        UserModel.update({_id:id},{$set:user},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};