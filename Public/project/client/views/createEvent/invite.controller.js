"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("InviteController",InviteController);
    function InviteController($rootScope, $location, EventService){
        var vm=this;

        vm.createEvent= function(event)
        {
            $rootScope.event.participate=event.participate;

            var emails = event.invited.split(",");
            $rootScope.event.invitedEmails = emails;
            console.log($rootScope.event.participate);
            if($rootScope.currentUser==null){
                EventService.
                    createEvent($rootScope.event);
            }
            else{

                EventService
                    .createEventForUser($rootScope.currentUser._id,$rootScope.event);
            }
            $rootScope.event=null;
            $location.url("/pollCreated");
        }
    }
})();
