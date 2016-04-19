(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs:"model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs:"model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs:"model"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/field",{
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/form/:formId/field", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                //$rootScope.errorMessage = 'You need to log in.';
                alert("You need to log in.");
                deferred.reject();
                $location.url('/login');
                //$rootScope.danger = "Unable to login";
            }
        });

        return deferred.promise;
    };
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
            {
                var deferred = $q.defer();

                $http.get('/api/assignment/loggedin').success(function(user)
                {
                    $rootScope.errorMessage = null;
                    // User is Authenticated
                    if (user !== '0' && user.roles.indexOf('admin') > -1)
                    {
                        $rootScope.currentUser = user;
                    deferred.resolve();
                }
                    else if(user=='0')
                    {
                        //$rootScope.errorMessage = 'You need to log in.';
                        alert("You need to log in.");
                        deferred.reject();
                        $location.url('/login');
                        //$rootScope.danger = "Unable to login";
                    }
                    else{
                        $location.url('/home');
                    }

            });

                return deferred.promise;
        };
    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();