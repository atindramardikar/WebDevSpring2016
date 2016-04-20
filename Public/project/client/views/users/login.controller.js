"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location, $rootScope) {

        var vm= this;
        vm.login = login;
        window.onbeforeunload=null;

        function init() {
        }
        init();

        function login(user) {

            if(!user) {
                return;
            }
            UserService.login(user)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }

    }
})();