(function(){
    angular
        .module("EventSchedulerApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/about",{
                templateUrl: "views/about/about.view.html"
            })
            .when("/event",{
                templateUrl: "views/createEvent/event.view.html"
            })
            .when("/timeProposal",{
                templateUrl: "views/createEvent/timeProposal.view.html"
            })
            .when("/settings",{
                templateUrl: "views/createEvent/settings.view.html",
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html"
            })
            .when("/dateProposal",{
                templateUrl: "views/createEvent/dateProposal.view.html"
            })
            .when("/invite",{
                templateUrl: "views/createEvent/invite.view.html"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();