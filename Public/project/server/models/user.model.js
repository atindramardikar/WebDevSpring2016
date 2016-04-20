var q = require('q');

module.exports = function(db, mongoose) {

    var UserSchema = require('./user.schema.server.js')(mongoose);
    // create user model from schema
    var UserModel = mongoose.model('project.eventScheduler.user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
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
                console.log("creating");
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

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, doc) {
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
        UserModel.update({_id:id},
            {
                email: user.email,
                password: user.password,
                name: user.name,
                language: user.language,
                //dob: Date,
                gender: user.gender,
                country: user.country
            },function(err,doc){
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