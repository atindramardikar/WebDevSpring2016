(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, $scope, UserService, $rootScope) {
        var vm = this;
        vm.update = update;
         vm.cu=null;
        function init() {
            vm.cu = UserService.getCurrentUser();
            if (vm.cu == null) {
                $location.url("/home");
            }
        }
        return init();

        function update(user) {
                UserService
                    .updateUser(vm.cu._id,user)
                    .then(function(response){
                        if(response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }
                    });
        }

    }
})();