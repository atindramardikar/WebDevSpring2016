"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("SignUpController",SignUpController);

    function SignUpController ( UserService, $location) {
        var vm = this;
        vm.signUp = signUp;


        function signUp(user) {
            UserService
                .createUser(user)
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }

})();