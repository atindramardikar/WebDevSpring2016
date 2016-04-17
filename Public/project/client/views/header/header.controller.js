(function(){
    angular
        .module("EventSchedulerApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, UserService, $location){
        $scope.aboutStyle=null;
        $scope.logout = logout;
        if($scope.$location.url()=="/about"){
            $scope.aboutStyle =
            {
                "color" : "black"
            }
        }

        function logout(){
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();