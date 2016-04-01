(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",registerController);

    function registerController($location, UserService) {
        var vm= this;
        vm.message = null;
        vm.userExistCheck= true;
        vm.register = register;

        function register(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide Password";
                return;
            }
            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                vm.message = "Please provide an email";
                return;
            }

                user.emails = user.email.split(",");
                UserService.findUserByUsername(user.username)
                    .then(function(response) {
                        if (response.data) {
                            vm.message='Username already exist!';
                        }else{
                            UserService
                                .createUser(user)
                                .then(function (response) {
                                    UserService.setCurrentUser(response.data);
                                    $location.url("/profile");

                                });
                        }
                    });
        }

    }
})();