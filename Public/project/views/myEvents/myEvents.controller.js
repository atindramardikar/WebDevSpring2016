"use strict";
(function () {
    angular
        .module("EventSchedulerApp")
        .controller("MyEventsController", MyEventsController);

    function MyEventsController($scope, EventService, $rootScope, $location) {
        $scope.currentUserId = $rootScope.currentUser._id;
        $scope.events = [];
        $scope.events = EventService.findAllEventsForUser($scope.currentUserId, id);

        $scope.deleteEvent = deleteEvent;
        $scope.selectEvent = selectEvent;
        $scope.updateEvent = updateEvent;
        $scope.createEvent = createEvent;


        function deleteEvent(index)
        {
            EventService.deleteEventById($scope.events[index]._id, function(response){});
            $scope.events.splice(index, 1);
        }

        function selectEvent(index)
        {
            $scope.event = {
                _id: $scope.events[index]._id,
                title: $scope.events[index].title,
                userId: $scope.events[index].userId
            }
        }

        function updateEvent(event)
        {
            EventService.updateEventById(event._id, event, function(response){});

        }

        function createEvent(event)
        {
            var newEvent = EventService.createEventForUser($scope.currentUserId,{
                title : event.title
            }, id);
            $scope.events.push(newEvent);
        }

        function id(param)
        {
            return param;
        }
    }
})();