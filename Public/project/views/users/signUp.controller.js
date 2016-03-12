"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("SignUpController",SignUpController);

    function SignUpController ($scope, UserService, $location) {
        $scope.signUp = signUp;
        $scope.message = null;
        console.log($scope.message);

        function signUp(user)
        {
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                console.log($scope.message);
                return;
            }
            if (!user.password || !user.verifyPassword) {
                $scope.message = "Please provide Password";
                return;
            }
            if (user.password != user.verifyPassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            UserService.setCurrentUser(user);
            console.log(user);
            $location.url("/profile");

        }
    }
})();