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
        createEvent : createEvent,
        deleteParticipant : deleteParticipant
    };
    return api;

    function createEvent(newEvent)
    {
        console.log("here");
        var deferred = q.defer();
        for(var i in newEvent.schedule){
            for(var j in newEvent.schedule[i].times){
                if(!newEvent.schedule[i].times[j]){
                    console.log("splicing");
                    newEvent.schedule[i].times.splice(j,1);
            }}
        }
        newEvent.userId=000;
        /*var userEvent = {
            userId : 000,
            /!*title : newEvent.title,
            address: newEvent.address,
            description:newEvent.description,
            name:newEvent.name,
            email:newEvent.email,
            schedule:newEvent.schedule,
            hidden:newEvent.hidden,
            oneOption:newEvent.oneOption,
            limit:newEvent.limit,
            participate:newEvent.participate,
            invitedEmails:newEvent.invitedEmails*!/
        };*/
        EventModel.create(newEvent,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                //console.log(doc);
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

    function deleteParticipant(eventId, date, time, participationIndex){
        var deferred = q.defer();
        //console.log(date);
        EventModel.findById(eventId)
            .then(function(response){
                var event=response.data;
                console.log(event);
                for(var i in event.schedule){
                    if(date == event.schedule[i]._id){
                        console.log(event.schedule[i]._id);
                        for(var j in event.schedule[i].times){
                            if(time == event.schedule[i].times[j]._id){
                                event.schedule[i].times[j].participants=event.schedule[i].times[j].participants.splice(participationIndex,1);
                            }
                        }
                    }
                }
                EventModel.update({_id:eventId},{$set:event}, function(err,doc){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            })

        return deferred.promise;
    }


    function createEventForUser (userId, newEvent) {
        var deferred = q.defer();
        for(var i in newEvent.schedule){
            //console.log("going into second for");
            for(var j in newEvent.schedule[i].times){
                //console.log(newEvent.schedule[i].times[j]);
                if(newEvent.schedule[i].times[j]== null){
                    console.log("splicing");
                    newEvent.schedule[i].times=newEvent.schedule[i].times.splice(j,1);
                }}}
        newEvent.userId=userId;
        EventModel.create(newEvent,function(err,doc){
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
        console.log("calling model");
        var deferred = q.defer();
        EventModel.update({_id:id},{$set:event}, function(err,doc){
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

    function findDetailsForEvent(eventId) {
    }

};