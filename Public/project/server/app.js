/**
 * Created by Sanjanamanoj on 3/23/2016.
 */
module.exports = function(app, db, mongoose,uuid)
{
   var  userModel = require('./models/user.model.js')(db,mongoose);
   var  eventModel = require('./models/event.model.js')(db,mongoose);


   var  userService = require('./services/user.service.server.js')(app,userModel);
   var  eventService = require('./services/event.service.server.js')(app,eventModel,uuid);
};