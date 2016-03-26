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
                templateUrl: "views/createEvent/event.view.html",
                controller: "EventController",
                controllerAs: "model"
            })
            .when("/timeProposal",{
                templateUrl: "views/createEvent/timeProposal.view.html"
            })
            .when("/settings",{
                templateUrl: "views/createEvent/settings.view.html",
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs: "model"
            })
            .when("/dateProposal",{
                templateUrl: "views/createEvent/dateProposal.view.html",
                controller: "DateController",
                controllerAs: "app"
            })
            .when("/invite",{
                templateUrl: "views/createEvent/invite.view.html",
                controller: "InviteController",
                controllerAs: "model"
            })
            .when("/pollCreated",{
                templateUrl: "views/createEvent/pollCreated.view.html"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model"
            })
            .when("/myEvents",{
                templateUrl: "views/myEvents/myEvents.view.html",
                controller: "MyEventsController",
                controllerAs: "model"
            })
            .when("/signUp",{
                templateUrl: "views/users/signUp.view.html",
                controller: "SignUpController",
                controllerAs: "model"
            })
            .when("/event/details/:eventId", {
                templateUrl: "views/myEvents/details.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/home"
            })
            }
})();