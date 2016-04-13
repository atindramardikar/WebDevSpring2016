(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, $scope, UserService, $rootScope) {
        var vm = this;
        vm.update = update;
         vm.cu=null;
        vm.message=null;
        function init() {
            UserService.getCurrentUser()
                .then(function(response)
                {
                    UserService.setCurrentUser(response.data);
                    vm.cu = response.data;

                    if (vm.cu == null) {
                        $location.url("/home");
                    }
                });

        }
        return init();

        function update(user) {
            //if(typeof user.emails == "string") {
            //    user.emails = user.emails.split(",");
            //}
                UserService
                    .updateUser(vm.cu._id,user)
                    .then(function(response){
                        if(response.data) {
                            vm.message='Profile updated Successfully';
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }
                    });
        }

    }
})();