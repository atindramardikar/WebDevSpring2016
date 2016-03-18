(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$rootScope){
        $scope.logout=logout

        function logout(){
            $rootScope.currentUser=null;
            $location.url("/home");
        }
    }
})();