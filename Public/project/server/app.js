/**
 * Created by Sanjanamanoj on 3/23/2016.
 */
module.exports = function(app, uuid)
{
    userModel = require('./models/user.model.js')(uuid);
    eventModel = require('./models/event.model.js')(uuid);

    userService = require('./services/user.service.server.js')(app,userModel);
    eventService = require('./services/event.service.server.js')(app,eventModel);
}