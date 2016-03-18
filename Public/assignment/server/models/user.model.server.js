var users = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        getUsers: getUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserById:findUserById,
        updateUser:updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        for(var u in users) {
            if( users[u].username === credentials.username &&
                users[u].password === credentials.password) {
                return users[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var u in users) {
            if( users[u].username == username) {
                return users[u];
            }
        }
        return null;
    }

    function getUsers(){
        return users;
    }

    function createUser(newUser){
        newUser._id = uuid.v1();
        users.push(newUser);
        return users;
    }

    function deleteUserById(){
        for (var u in users) {
            if (users[u]._id === id) {
                users.splice(u, 1);
            }
        }
        return users;
    }

    function findUserById(){
        for (var u in users) {
            if (users[u]._id == id) {
                return users[u];
            }
        }
        return null;
    }

    function updateUser(){
        for (var u in users) {
            if (users[u]._id == id) {
                users[u] = user;
            }
        }
        return users;
    }
}