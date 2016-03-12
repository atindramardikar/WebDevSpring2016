
(function(){
    angular
        .module("EventSchedulerApp")
        .controller("HomeController",HomeController);

    function HomeController($scope) {
        $scope.event=event;
        function event(){
            $scope.$location.url("/event");
        }
    }
})();