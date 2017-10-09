module.exports = function(app, db, mongoose) {
    var usermodel = require("./models/user.model.js")(db,mongoose);
    var formmodel = require("./models/form.model.js")(db,mongoose);
    var fieldModel = require("./models/field.model.js") (db,mongoose,formmodel);

    //var userservice = require("./services/user.service.server.js")(app, usermodel);
    //var formservice = require("./services/form.service.server.js")(app, formmodel);
    //var fieldService = require("./services/field.service.server.js") (app, formmodel, fieldModel);
}
