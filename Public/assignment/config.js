(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();