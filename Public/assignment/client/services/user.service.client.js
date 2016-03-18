(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername
        };
        return api;

        function findUserByCredentials(credentials) {
            console.log(credentials);
            return $http.post('/api/assignment/user',credentials);

            //for (var u in model.users) {
              //  if (model.users[u].username === username &&
                //    model.users[u].password === password) {
                //}
            //}
        }
        function findAllUsers(callback){
            callback(model.users);
        }
        function createUser(user,callback){
            model.users.push(user);
            callback(user);
        }
        function deleteUserById(userId,callback){

        }

        function updateUser(userId,currentUser,callback){

            var user = model.findUserByUsername (currentUser.username);
            if (user != null) {
                user.username = currentUser.username;
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
            }
            callback(user);
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

    }
})();