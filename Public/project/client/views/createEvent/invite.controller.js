"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("InviteController",InviteController);
    function InviteController($rootScope, $location, EventService){
        var vm=this;
        vm.createEvent= function(){
            if($rootScope.currentUser==null){
                EventService.
                    createEvent($rootScope.event);
            }
            else{
                EventService
                    .createEventForUser($rootScope.currentUser._id,$rootScope.event);
            }
            $rootScope.event=null;
            $location.url("/home");
        }
    }
})();
