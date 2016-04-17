
(function(){
    angular
        .module("EventSchedulerApp")
        .controller("HomeController",HomeController);

    function HomeController($rootScope,$location) {
        $rootScope.event=event;
        window.onbeforeunload=null;
        function event(){
           $location.url("/event");
            $rootScope.event=null;
        }
    }
})();