"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("SettingsController",SettingsController);

    function SettingsController(EventService,$location, $rootScope) {
        var vm = this;
        vm.update = update;
        vm.noAction=noAction;

        function init() {

        }
        return init();

        function update(event)
        {
                $rootScope.event.hidden = event.hidden;
                $rootScope.event.limit = event.limit;
                $rootScope.event.oneOption=event.oneOption;

            console.log($rootScope.event);
            $location.url('/invite');
        }

        function noAction()
        {
            $rootScope.event.hidden = "false";
            $rootScope.event.limit = "false";
            $rootScope.event.oneOption= "false";

            console.log($rootScope.event);
            $location.url('/invite');
        }

    }
})();
