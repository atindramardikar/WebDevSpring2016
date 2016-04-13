/**
 * Created by Sanjanamanoj on 3/24/2016.
 */
var q = require('q');

module.exports = function (db, mongoose) {

    var EventSchema = require('./event.schema.server.js')(mongoose);

    // create user model from schema
    var EventModel = mongoose.model('project.eventScheduler.event', EventSchema);

    var api = {
        createEventForUser: createEventForUser,
        deleteEventById: deleteEventById,
        findAllEvents: findAllEvents,
        findEventById: findEventById,
        updateEvent: updateEvent,
        findEventByTitle: findEventByTitle,
        findEventsByUserId: findEventsByUserId,
        findDetailsForEvent : findDetailsForEvent,
        createEvent : createEvent
    };
    return api;

    function createEvent(newEvent)
    {
        var deferred = q.defer();
        var userEvent = {
            userId : 000,
            title : newEvent.title,
            address: newEvent.address,
            description:newEvent.description,
            name:newEvent.name,
            email:newEvent.email,
            schedule:newEvent.schedule,
            hidden:newEvent.hidden,
            oneOption:newEvent.oneOption,
            limit:newEvent.limit,
            participate:newEvent.participate,
            invitedEmails:newEvent.invitedEmails
        };
        EventModel.create(userEvent,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findEventByTitle(title) {
       var deferred = q.defer();
        EventModel.find({title:title},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findEventsByUserId(userId) {
       var deferred = q.defer();
        EventModel.find({userId:userId},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findEventById (id) {
        var deferred = q.defer();
        EventModel.findById(id,function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllEvents () {
        var deferred = q.defer();
        EventModel.find(function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteEventById (id) {
        var deferred = q.defer();
        EventModel.remove({_id:id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createEventForUser (userId, newEvent) {
        var deferred = q.defer();
        var userEvent = {
            userId : userId,
            title : newEvent.title,
            address: newEvent.address,
            description:newEvent.description,
            name:newEvent.name,
            email:newEvent.email,
            schedule:newEvent.schedule,
            hidden:newEvent.hidden,
            oneOption:newEvent.oneOption,
            limit:newEvent.limit,
            participate:newEvent.participate,
            invitedEmails:newEvent.invitedEmails
        };
        EventModel.create(userEvent,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateEvent (id, event) {
        var deferred = q.defer();
        EventModel.update({_id:id},{$set:event}, function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findDetailsForEvent(eventId) {
    }



};