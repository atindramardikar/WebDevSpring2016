/**
 * Created by Sanjanamanoj on 3/4/2016.
 */
"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($location, EventService, $routeParams) {
        var vm = this;
        vm.update = update;
        vm.cu=null;
        var eventId="000";
        if ($routeParams.eventId) {
            eventId = $routeParams.eventId;
        }

        function init() {
            EventService
                .findDetailsForEvent(eventId)
                .then

        }
        return init();

        function updateEvent(event){
            EventService
                .updateEventById(event._id, event)
                .then($location.url("/home"));
        }


    }
})();