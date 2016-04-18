
(function(){
    angular
        .module("EventSchedulerApp")
        .controller("HomeController",HomeController);

    function HomeController($rootScope,$location) {
        var vm = this;
        vm.event=event;
        window.onbeforeunload=null;
        function event(){
           $location.url("/event");
            $rootScope.event=null;
        }
    }
})();