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
                templateUrl: "views/users/login.view.html",
                controller : "LoginController"
            })
            .when("/dateProposal",{
                templateUrl: "views/createEvent/dateProposal.view.html",
                controller: "DateController",
                controllerAs: "app"
            })
            .when("/invite",{
                templateUrl: "views/createEvent/invite.view.html"
            })
            .when("/pollCreated",{
                templateUrl: "views/createEvent/pollCreated.view.html"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"
            })
            .when("/myEvents",{
                templateUrl: "views/myEvents/myEvents.view.html",
                controller: "MyEventsController"
            })
            .when("/signUp",{
                templateUrl: "views/users/signUp.view.html",
                controller: "SignUpController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();