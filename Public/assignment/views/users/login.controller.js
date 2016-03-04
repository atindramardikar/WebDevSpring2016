(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location, $scope, UserService, $rootScope) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username,user.password, function(user){
                $rootScope.currentUser=user;
                $location.url("/profile");
            });
        }

    }
})();