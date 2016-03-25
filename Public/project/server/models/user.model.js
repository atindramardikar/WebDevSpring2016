var users = require("./user.mock.json");
module.exports = function(uuid) {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser:updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        console.log(credentials);
        for(var u in users) {
            if( users[u].username === credentials.username &&
                users[u].password === credentials.password) {
                return users[u];
            }
        }
        return null;
    }

    function findAllUsers()
    {
        return users;
    }


    function createUser(newUser){
        newUser._id = uuid.v1();
        users.push(newUser);
        return newUser;
    }

    function deleteUserById(id){
        for (var u in users) {
            if (users[u]._id === id) {
                users.splice(u, 1);
            }
        }
        return users;
    }



    function updateUser(id,user){
        for (var u in users) {
            if (users[u]._id == id) {
                users[u] = user;
            }
        }
        return user;
    }
};