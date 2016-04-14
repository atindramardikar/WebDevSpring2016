"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location) {

        var vm= this;
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {

            console.log(user);
            if(!user) {
                return;
            }
            UserService.login(user)
                .then(function(response){
                    if(response.data) {
                       // console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }

    }
})();