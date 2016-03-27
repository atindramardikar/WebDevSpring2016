/**
 * Created by Sanjanamanoj on 3/24/2016.
 */
module.exports = function(app, eventModel) {
    app.get("/api/project/user/:userId/event", getEventsForUser);
    app.get("/api/project/event/:eventId/details", findDetailsForEvent);
    app.delete("/api/project/event/:eventId", deleteEventById);
    app.post("/api/project/user/:userId/event", createEventForUser);
    app.post("/api/project/event",createEvent);
    app.put("/api/project/event/:eventId", updateEventById);

    function createEvent(req,res){
        var event = req.body;
        res.json(eventModel.createEvent(event));
    }


    function getEventsForUser(req, res) {
        var id = req.params.userId;
        var userEvents = eventModel.findEventsByUserId(id);
        res.json(userEvents);
    }

    function findDetailsForEvent(req,res){
        var id = req.params.eventId;
        console.log(id);
        var event = eventModel.findEventById(id);
        res.json(event);
    }

    function deleteEventById(req, res) {
        var id = req.params.eventId;
        eventModel.deleteEventById(id);
        res.send(200);
    }

    function createEventForUser(req, res) {
        var userId = req.params.userId;
        var event = req.body;
        eventModel.createEventForUser(userId, event);
    }

    function updateEventById(req, res) {
        var id = req.params.eventId;
        var event = req.body;
        eventModel.updateEvent(id, event);
        res.send(200);
    }
};