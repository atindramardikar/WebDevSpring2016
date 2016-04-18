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
        vm.message=null;
        function init() {
            $rootScope.event.closePoll=false;
        }
        return init();

        function update(event)
        {
                $rootScope.event.hidden = event.hidden;
                $rootScope.event.limit = event.limit;
            if(event.limit){
                if(!event.limitNumber){
                    vm.message='Enter the participation limit';
                    return
                }
                $rootScope.event.limitNumber = event.limitNumber;
            }

            console.log($rootScope.event);
            $location.url('/invite');
        }

        function noAction()
        {
            $rootScope.event.hidden = false;
            $rootScope.event.limit = false;

            console.log($rootScope.event);
            $location.url('/invite');
        }

    }
})();
