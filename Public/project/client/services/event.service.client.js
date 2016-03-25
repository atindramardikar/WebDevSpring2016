/**
 * Created by Sanjanamanoj on 3/8/2016.
 */

"use strict";
(function () {
    angular
        .module("EventSchedulerApp")
        .factory("EventService", EventService);

    function EventService($http) {

        var api = {
            createEventForUser: createEventForUser,
            findAllEventsForUser: findAllEventsForUser,
            deleteEventById: deleteEventById,
            updateEventById: updateEventById,
            findDetailsForEvent : findDetailsForEvent,
            createEvent : createEvent
        };
        return api;

        function createEvent(event){
            return $http.post("/api/project/event",event);
        }

        function createEventForUser(userId, event){
            return $http.post("/api/project/user/" + userId + "/event", event);
        }

        function findAllEventsForUser(userId){
            return $http.get("/api/project/user/" + userId + "/event");
        }

        function deleteEventById(eventId){
            return $http.delete("/api/project/event/" + eventId);
        }

        function updateEventById(eventId, newEvent){
            return $http.put("/api/project/event/" + eventId, newEvent);
        }

        function findDetailsForEvent(eventId)
        {
            return $http.get("/api/project/event/"+eventId+"/details");
        }


    }
})();
