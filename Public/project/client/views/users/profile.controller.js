"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, UserService) {
        var vm = this;
        vm.update = update;
        vm.message="";
        vm.cu=null;
        window.onbeforeunload=null;
        function init() {
            vm.cu = UserService.getCurrentUser();
            if (vm.cu == null) {
                $location.url("/home");
            }
        }
        return init();

        function update(user) {
            UserService
                .updateUser(user._id,user)
                .then(function(doc) {
                        if (doc) {
                            UserService.setCurrentUser(user);
                            vm.message = "Updated Successfully!";
                        }
                    },
                    function(err){
                    }
                );
        }

    }
})();