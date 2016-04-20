(function() {
    'use strict';
    angular
        .module('EventSchedulerApp')
        .controller('AdminInviteController', AdminInviteController);

    function AdminInviteController($routeParams, EventService, $location) {

        var vm=this;
        vm.updatedInvitedList = updatedInvitedList;
        vm.sendMail = sendMail;
        vm.eventId = $routeParams.eventId;
        //console.log(vm.eventId);


        EventService
            .findEventById(vm.eventId)
            .then(
                function(response){
                    vm.event = response.data;
                   // console.log(vm.event);
                }
            );

        function updatedInvitedList(invited){
            vm.invited = invited.split(",");
            vm.event.invitedEmails = vm.invited;
            //console.log(vm.event);
            EventService
                .updateEventById(vm.eventId, vm.event)
                .then(function(response) {


                    //window.open('mailto:sanjanamanoj@gmail.com');

                })

        }


        function sendMail(){
            console.log("invite controller");
            var mailOptions = {
                from: "justintime.scheduler@gmail.com",
                to: "sanjanamanoj@gmail.com",
                subject: "Hello",
                generateTextFromHTML: true,
                html: "<b>Hello world</b>"
            };
            EventService.sendMail(mailOptions)
                .then(function(response){
                    console.log(response.data);
                });
            //$location.url('/event/'+vm.eventId+'/admin-administration');
        }
    }

})();

