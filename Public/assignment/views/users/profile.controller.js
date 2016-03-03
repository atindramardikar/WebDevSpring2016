(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, $scope, UserService, $rootScope) {
        $scope.update = update;

        function update(cuser) {
                UserService.updateUser(currentUser._id,cuser, function(nuser){
                $location.url("/profile");
            });
        }

    }
})();