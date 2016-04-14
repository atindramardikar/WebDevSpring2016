(function() {
    'use strict';
    angular
        .module('EventSchedulerApp')
        .controller('AdminInviteController', AdminInviteController);

    function AdminInviteController($routeParams, EventService) {

        var vm=this;
        vm.updatedInvitedList = updatedInvitedList;
        vm.eventId = $routeParams.eventId;
        console.log(vm.eventId);


        EventService
            .findEventById(vm.eventId)
            .then(
                function(response){
                    vm.event = response.data;
                    console.log(vm.event);
                }
            );

        function updatedInvitedList(invited){
            vm.invited = invited.split(",");
            vm.event.invitedEmails = vm.invited;
            console.log(vm.event);
            EventService
                .updateEventById(vm.eventId, vm.event)
                .then(function(response) {

                    //window.open('mailto:sanjanamanoj@gmail.com');

                })

        }


    }

})();

