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

            if(event.participate==1){
                if(!event.invited){
                    vm.errormessage = "Please invite people";
                    return;
                }
            }

            if(event.invited) {
                var emails = event.invited.split(",");
                $rootScope.event.invitedEmails = emails;
            }
            //console.log($rootScope.event.participate);
            console.log($rootScope.event._id);
            if($rootScope.event._id){
                EventService
                    .updateEventById($rootScope.event._id, $rootScope.event)
                    .then($location.url('/event/' + $rootScope.event._id+ "/" + $rootScope.event.adminId + "/admin-table"));
            }
            else{
                if (!$rootScope.currentUser) {
                    console.log("user is null");
                    EventService.createEvent($rootScope.event)
                        .then(function (response) {
                            if (response.data) {
                                $rootScope.inviteurl = "localhost:3000/project/client/#/event/" + response.data._id + "/poll";
                                $rootScope.adminurl = "localhost:3000/project/client/#/event/" + response.data._id + "/" + response.data.adminId + "/admin-table";
                                EventService
                                    .setEvent(response.data);
                            }
                            $location.url("/pollCreated");
                        });
                }

                else{
                    console.log($rootScope.currentUser);
                    console.log("creating for logged in user");
                    EventService
                        .createEventForUser($rootScope.currentUser._id,$rootScope.event)
                        .then($location.url("/pollCreated"));

                }
                }
            }
            //$rootScope.event=null;

        }

})();
