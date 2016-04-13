/**
 * Created by Sanjanamanoj on 3/24/2016.
 */
module.exports = function(app, eventModel) {
    app.get("/api/project/user/:userId/event", getEventsForUser);
    app.get("/api/project/event/:eventId/details", findDetailsForEvent);
    app.get("/api/project/event/:eventId",findEventById);
    app.delete("/api/project/event/:eventId", deleteEventById);
    app.post("/api/project/user/:userId/event", createEventForUser);
    app.post("/api/project/event",createEvent);
    app.put("/api/project/event/:eventId", updateEventById);

    function createEvent(req,res){
        var event = req.body;
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

    function createEventForUser(req, res) {
        var userId = req.params.userId;
        var event = req.body;
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
};