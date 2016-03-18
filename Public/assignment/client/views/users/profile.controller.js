(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, $scope, UserService, $rootScope) {
        $scope.update = update;

        function update(user) {
                UserService.updateUser($rootScope.currentUser._id,user, function(user){
                    $rootScope.currentUser=user;
                    $location.url("/profile");
                    console.log($rootScope.currentUser);
            });
        }

    }
})();