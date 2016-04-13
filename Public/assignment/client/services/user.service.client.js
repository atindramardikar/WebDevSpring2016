(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            logout:logout,
            register:register,
            updateUserById:updateUserById
        };
        return api;

        function login(user) {
            return $http.post("/api/assignment/login",user);
        }

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }
        function createUser(user){
            return $http.post("/api/assignment/admin/user", user);
        }
        function deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function updateUser(userId,user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function register(user){
            console.log(user);
            return $http.post("/api/assignment/register",user);
        }

        function updateUserById(userId, user){
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

    }
})();