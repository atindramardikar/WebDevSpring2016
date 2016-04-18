"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("SignUpController",SignUpController);

    function SignUpController ( UserService, $location) {
        var vm = this;
        vm.signUp = signUp;
        window.onbeforeunload=null;

        function signUp(user) {
            UserService
                .register(user)
                .then(function (response) {
                    if (response.data) {
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }

})();