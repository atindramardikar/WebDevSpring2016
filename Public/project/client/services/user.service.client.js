/**
 * Created by Sanjanamanoj on 2/19/2016.
 */
"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .factory("UserService",UserService);

    function UserService($http, $rootScope)
    {

       // var fakeData = [];

        var api=
        {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };
        return api;

        function findUserByCredentials(credentials)
        {
           // console.log(credentials);
            return $http.get("/api/project/user?email="+credentials.email +"&password="+credentials.password);
        }

        function findAllUsers()
        {
            return $http.get("/api/project/user");
        }

        function createUser(user)
        {
            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId,user)
        {
            console.log("in user services");
           // console.log(user);
            return $http.put("/api/project/user/" + userId, user);
        }


        function setCurrentUser(user)
        {
            $rootScope.currentUser = user;
            console.log($rootScope.currentUser);
        }

        function getCurrentUser()
        {
            return $rootScope.currentUser;
        }


    }
})();
