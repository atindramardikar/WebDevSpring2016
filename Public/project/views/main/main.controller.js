(function(){
    angular
        .module("EventSchedulerApp")
        .controller("MainController",MainController);

    function MainController($scope, $location){
        $scope.$location=$location;
    }
})();