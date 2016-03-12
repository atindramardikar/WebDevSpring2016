"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .factory("UserService",UserService);

    function UserService($rootScope)
    {

        var fakeData = [];
        fakeData =[
            {
                "_id":123, "name":"Alice", "password":"alice", "language":"Chinese", "dob":12-7-1993,"country":"China",
                "gender":"Female","email":"alice@gmail.com"
            },

            {
                "_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob",
                "email":"bob@gmail.com"
            },
            {
                "_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie", "password":"charlie",
                "email":"charlie@gmail.com"
            },
            {
                "_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan",
                "email":"dan@gmail.com"
            },
            {
                "_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed",
                "email":"edward@gmail.com"
            }
        ];
        var model=
        {
            findUserByEmailAndPassword : findUserByEmailAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };
        return model;


        function findUserByEmailAndPassword(email, password, callback) {
            for (var u in fakeData) {
                if (fakeData[u].email === email &&
                    fakeData[u].password === password)
                {
                    callback(fakeData[u]);
                }
            }
            return null;
        }



        function findAllUsers(callback)
        {
            callback(fakeData);
        }

        function createUser (user, callback)
        {
            var newUser =
            {
                "_id" : new Date().getTime(),
                "username": user.username,
                "password": user.password,
                "firstName" : "",
                "lastName": "",
                "email": user.email,
                "role": ""
            };
            fakeData.push(newUser);
            callback(newUser);
        }



        function deleteUserById(userId, callback)
        {
            var index = fakeData.indexOf(userId);
            fakeData.splice(index,1);
            callback(fakeData);
        }


        function updateUser (userId, user,callback)
        {
            var u = findUserById (userId);
            if (u != null)
            {
                u.firstName = user.firstName;
                u.lastName = user.lastName;
                u.password = user.password;
                u.username = user.username;
                u.roles = user.roles;
                callback(u);
            }
            else
            {
                return null;
            }
        }

        function findUserById(userId)
        {
            for (var u in fakeData)
            {
                if (fakeData[u]._id === userId)
                {
                    return fakeData[u];
                }
            }
            return null;
        }

        function setCurrentUser (user)
        {
            $rootScope.currentUser = user;
        }

        function getCurrentUser ()
        {
            return $rootScope.currentUser;
        }

    }
})();