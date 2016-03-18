module.exports = function(app,uuid) {
    var usermodel = require("./models/user.model.js")(uuid);
    var formmodel = require("./models/form.model.js")(uuid);
    var userservice = require("./services/user.service.server.js")(app, usermodel);
    var formservice = require("./services/form.service.server.js")(app, formmodel);
    }