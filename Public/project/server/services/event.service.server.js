
var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');
//var smtpTransport = require("nodemailer-smtp-transport");
var gmail = wellknown('Gmail');
var xoauth2 = require('xoauth2');


module.exports = function(app, eventModel,uuid) {
    app.get("/api/project/user/:userId/event", getEventsForUser);
    app.get("/api/project/event/:eventId/details", findDetailsForEvent);
    app.get("/api/project/event/:eventId",findEventById);
    app.delete("/api/project/event/:eventId", deleteEventById);
    app.post("/api/project/user/:userId/event", createEventForUser);
    app.post("/api/project/event",createEvent);
    app.put("/api/project/event/:eventId", updateEventById);
    app.put("/api/project/event/:id/participant", deleteParticipant);
    app.post("/api/project/sendMail",sendMail);

    function createEvent(req,res){
        var event = req.body;
        //console.log("yooo");
        event.adminId=uuid.v1();
        eventModel.createEvent(event)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findEventById(req,res){
        var id = req.params.eventId;
        eventModel.findEventById(id)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }


    function getEventsForUser(req, res) {
        var id = req.params.userId;
       eventModel.findEventsByUserId(id)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findDetailsForEvent(req,res){
        var id = req.params.eventId;
        //console.log(id);
        eventModel.findEventById(id)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteEventById(req, res) {
        var id = req.params.eventId;
        eventModel.deleteEventById(id)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteParticipant(req, res){
        //console.log(req.body);
        var eventId = req.params.id;
        var obj = req.body;
        var date=req.body.date;
        var time = req.body.time;
        var participantIndex = req.body.participantIndex;
        eventModel.findEventById(eventId)
            .then(function(event){
                    //console.log("here"+event);
                    eventModel.deleteParticipant(event, date, time, participantIndex)
                        .then(
                            function(doc){
                                res.json(doc);
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                },
                function(err){
                    res.status(400).send(err);
                })

    }

    function createEventForUser(req, res) {
        var userId = req.params.userId;
        var event = req.body;
        event.adminId=uuid.v1();
        eventModel.createEventForUser(userId, event)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateEventById(req, res) {
        console.log("calling server");
        var id = req.params.eventId;
        var event = req.body;
        eventModel.updateEvent(id, event)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function sendMail(req,res) {
        var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                XOAuth2: {
                    user: "justintime.scheduler@gmail.com", // Your gmail address.
                    // Not @developer.gserviceaccount.com
                    clientId: "75758805904-ud2pfvu17eqnpop9lq1np060cf5bqhpv.apps.googleusercontent.com",
                    clientSecret: "KbWYarYSuWXwmUjYlULkH8V3",
                    refreshToken: "1/EUQ2gZNeldGPv4EeIOEw1CTRyVGoGpykzzxLqLnVh8c"
                }
            }
        });
        var mailOptions = req.body;
        console.log("here");
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                smtpTransport.close();
                res.send(response);
                console.log(response);
            }

        });


    }
};