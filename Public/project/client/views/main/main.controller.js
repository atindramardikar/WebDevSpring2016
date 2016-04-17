(function(){
    angular
        .module("EventSchedulerApp")
        .controller("MainController",MainController);

    function MainController($scope, $location){
        $scope.$location=$location;

        /*window.onbeforeunload = function(e) {
            return 'Dialog text here.';
        };*/
    }
})();