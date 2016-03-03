(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],

            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return model;

        function findUserByUsernameAndPassword(username,password,callback){

        }
        function findAllUsers(callback){

        }
        function createUser(user,callback){
            model.users.push(user);
            callback(user);
        }
        function deleteUserById(userId,callback){}

        function updateUser(userId,user,callback){

            for(var i=0;i<model.users.length;i++){
                if(model.users._id[i]==userId){
                    var tempuser=model.user[i];
                }
            }
            if(tempuser!=null){
                    tempuser.username=user.username,
                    tempuser.firstName=user.firstName,
                    tempuser.lastName=user.lastName,
                    tempuser.email=user.email
            }
        }

    }
})();