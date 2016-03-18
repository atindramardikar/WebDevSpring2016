(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",registerController);

    function registerController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide Password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            var newUser = {
                "_id": (new Date).getTime(),
                "username": user.username,
                "password": user.password,
                "email": user.email
            }
            UserService.createUser(newUser, function(nuser){
                $rootScope.currentUser = nuser;
                $location.url("/profile");
            });
        }

    }
})();