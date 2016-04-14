(function() {
    'use strict';
    angular
        .module('EventSchedulerApp')
        .controller('AdminAdministrationController', AdminAdministrationController);

    function AdminAdministrationController($routeParams, EventService) {

        var vm=this;
        vm.eventId = $routeParams.eventId;
        console.log(vm.eventId);

    }

})();
