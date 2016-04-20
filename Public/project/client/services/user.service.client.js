(function(){
    angular
        .module("EventSchedulerApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return api;

        function logout() {
            return $http.post("/api/project/logout");
        }

        function createUser(user) {
            return $http.post('/api/project/user', user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/'+userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/project/user/'+userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $http.get("/api/project/check");
        }

    }
})();