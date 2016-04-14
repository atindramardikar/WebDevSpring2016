



(function(){
    angular
        .module("EventSchedulerApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider){
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
                templateUrl: "views/createEvent/timeProposal.view.html",
                controller: "TimeController",
                controllerAs:"model"
            })
            .when("/settings",{
                templateUrl: "views/createEvent/settings.view.html",
                controller:"SettingsController",
                controllerAs:"model"
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
                templateUrl: "views/createEvent/pollCreated.view.html",
                controller:"PollCreatedController",
                controllerAs:"model"

            })
            .when("/event/:eventId/poll", {
                templateUrl: "views/poll/poll.view.html",
                controller:"PollController",
                controllerAs: "model"
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
                templateUrl: "views/myEvents/myEventDetails.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })
            .when("/event/:eventId/admin-table",{
                templateUrl:"views/admin/admin.table.view.html",
                controller: "AdminTableController",
                controllerAs:"model"
            })
            .when("/event/:eventId/admin-administration",{
                templateUrl:"views/admin/admin.administration.view.html",
                controller: "AdminAdministrationController",
                controllerAs:"model"
            })
            .when("/event/:eventId/admin-invite",{
                templateUrl:"views/admin/admin.invite.view.html",
                controller: "AdminInviteController",
                controllerAs:"model"
            })

            .otherwise({
                redirectTo: "/home"
            })
            }

})();