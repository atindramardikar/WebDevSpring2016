(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, $scope, UserService, $rootScope) {
        var vm = this;

        function init() {
            var currentUser = UserService.getCurrentUser();
            if (currentUser == null) {
                $location.url("/home");
            }
        }
        return init();

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