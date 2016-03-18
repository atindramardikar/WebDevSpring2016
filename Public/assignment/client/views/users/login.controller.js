(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService) {
        var vm= this;
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            UserService.findUserByCredentials({
                username: user.username,
                password: user.password
            })
        }

    }
})();