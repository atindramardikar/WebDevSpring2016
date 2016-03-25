"use strict";
(function () {
    angular
        .module("EventSchedulerApp")
        .controller("MyEventsController", MyEventsController);

    function MyEventsController(EventService, $rootScope) {
        var vm = this;

        vm.deleteEvent = deleteEvent;
        vm.addEvent = addEvent;
        vm.updateEvent = updateEvent;
        vm.selectEvent = selectEvent;
        vm.userEvents = [];
        vm.event = null;

        function init () {
            EventService
                .findAllEventsForUser($rootScope.currentUser._id)
                .then(renderEvents);
            vm.event= null;
        }

        init();

        function renderEvents(response){
            vm.userEvents = response.data;
        }

        function addEvent(event) {
            EventService
                .createEventForUser($rootScope.currentUser._id, event)
                .then(init);
        }

        function updateEvent(event){
            EventService
                .updateEventById(event._id, event)
                .then(init);
        }

        function selectEvent(index){
            console.log(index);
            vm.event = vm.userEvents[index];
        }

        function deleteEvent(index){
            console.log(index);
            EventService
                .deleteEventById(vm.userEvents[index]._id)
                .then(init);
        }

    }
})();