"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("EventController",EventController);

    function EventController($location, $rootScope) {
        var vm = this;
        vm.update = update;
        vm.cu=null;

        function init() {

        }
        return init();

        function update(event){
            console.log(event);
            $rootScope.eventDetails=
                {
                    "title": event.title,
                    "address": event.address,
                    "description": event.description,
                    "name": event.yourName,
                    "email": event.yourEmail
                }
            console.log($rootScope.eventDetails);
                $location.url("/dateProposal");
        }


    }
})();