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
        vm.message="";

        function signUp(user) {
            if(!user){
                vm.message="Enter required fields";
                return;
            }
            else if(!user.email){
                vm.message="Enter email";
                return;
            }
            else if(!user.password)
                {
                    vm.message="Enter password";
                    return;
                }
            else if(user.password!=user.verifyPassword){
                vm.message="Passwords must match";
                return;
            }
            UserService
                .register(user)
                .then(function (doc) {
                        console.log(doc);

                        if (doc.data==null) {
                            vm.message = "Email already exists";
                            return;
                        }
                        else {
                            UserService.setCurrentUser(doc);
                            $location.url("/profile");
                        }
                    },
                    function (err){
                    }
                );
        }
    }

})();