"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("LoginController",LoginController);

    function LoginController ($scope, UserService, $location) {
        $scope.login = login;
        $scope.noAccount = noAccount;

        function login(user)
        {
            UserService.findUserByEmailAndPassword( user.email, user.password, function(response){

                UserService.setCurrentUser(response);
                console.log(response);
                $location.url("/profile");

            });

        }

        function noAccount()
        {
            $location.url("/signUp");
        }
    }
})();