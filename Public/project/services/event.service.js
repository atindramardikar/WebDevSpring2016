"use strict";
(function () {
    angular
        .module("EventSchedulerApp")
        .factory("EventService", EventService);

    function EventService() {
        var events = [];
        events = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];
        var service = {
            createEventForUser: createEventForUser,
            findAllEventsForUser: findAllEventsForUser,
            deleteEventById: deleteEventById,
            updateEventById: updateEventById
        };
        return service;

        function createEventForUser(userId, event, callback)
        {
            event._id = (new Date).getTime();
            event.userId = userId;
            events.push(event);
            return callback(event);
        }

        function findAllEventsForUser(userId, callback)
        {
            var userEvents = [];
            for(var i in events) {
                if (events[i].userId === userId) {
                    userEvents.push(events[i]);
                }
            }
            return callback(userEvents);
        }

        function deleteEventById(eventId, callback) {
            for(var i in events) {
                if (events[i]._id === eventId) {
                    events.splice(i, 1);
                    break;
                }
            }
            return callback(events);
        }

        function updateEventById(eventId, newEvent, callback) {
            for(var i in events) {
                if (events[i]._id === eventId) {
                    events[i].title = newEvent.title;
                    events[i].userId = newEvent.userId;
                    return callback(events[i]);
                }
            }
            return callback(null);
        }
    }
})();