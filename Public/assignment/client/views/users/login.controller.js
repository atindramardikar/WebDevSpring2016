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
            UserService.login({
                username: user.username,
                password: user.password
            })
                .then(function(res){
                    if(res.data) {
                        UserService.setCurrentUser(res.data);
                        $location.url("/profile");
                    }
                });
        }

    }
})();