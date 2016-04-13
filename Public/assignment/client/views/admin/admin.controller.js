"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService)
    {
        var vm=this;
        vm.remove = remove;
        vm.update = update;
        vm.add    = add;
        vm.select = select;
        //vm.sortField;
        vm.order='false';

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            UserService
                .updateUserById(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            vm.user = angular.copy(user);
        }

        function handleSuccess(response) {
            vm.user=null;
            vm.users = response.data;
            for(var i in vm.users)
            vm.users[i].roles=vm.users[i].roles.toString();

        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();