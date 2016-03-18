module.exports = function(app) {
    console.log("hello");
    var service = require("./services/user.service.server.js")(app);
    }