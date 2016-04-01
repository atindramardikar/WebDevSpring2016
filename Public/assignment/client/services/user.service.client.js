(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            logout:logout
        };
        return api;

        function findUserByCredentials(credentials) {
            return $http.get("/api/assignment/user?username="+credentials.username +"&password="+credentials.password);
        }

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log($rootScope.currentUser);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/user/loggedin");
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }
        function createUser(user){
            return $http.post("/api/assignment/user",user);
        }
        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/" + userId);
        }

        function logout() {
            return $http.post("/api/assignment/user/logout");
        }

        function updateUser(userId,user){
            return $http.put("/api/assignment/user/" + userId, user);
        }



    }
})();