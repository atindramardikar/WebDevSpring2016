"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, $scope, UserService)
    {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.update = update;
        function update(user)
        {
            UserService.updateUser(user._id, user ,function(response){
                UserService.setCurrentUser(response);
                console.log(response);

            })

        }
    }
})();