(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location) {
        var vm= this;
        vm.message=null;
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                vm.message='Enter all the fields';
                return;
            }
            UserService.findUserByCredentials({
                username: user.username,
                password: user.password
            })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else{
                        vm.message='Credentials does not match';
                    }
                });
        }

    }
})();