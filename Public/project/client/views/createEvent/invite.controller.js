"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("InviteController",InviteController);
    function InviteController($rootScope, $location, EventService){
        var vm=this;

        function sendMail(event){
            if($rootScope.event.invitedEmails){
                // var invitees=[];
                //event.invitedEmails.trim();
                // $rootScope.title=vm.event.title;
                console.log("invite controller");
                var mailOptions = {
                    from: "justintime.scheduler@gmail.com",
                    to: event.invitedEmails,
                    subject: "JustInTime Event Invitation",
                    //generateTextFromHTML: true,
                    text: "Hello, \n"+event.name+" has invited you to participate in the following event:\n" +
                    "Event Title: "+event.title+
                    "\nEvent Location: "+event.address+
                    "\nParticipation link:\n"+
                    "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + event._id + "/poll"
                };

                EventService.sendMail(mailOptions)
                    .then(function(doc){
                        },
                        function(err){
                            console.log(err);
                        });
            }


            //$location.url('/event/'+vm.eventId+'/admin-administration');
        }

        function sendmailAdmin(event){
            console.log(event.email);
            var mailOptions = {
                from: "justintime.scheduler@gmail.com",
                to: event.email.toString(),
                subject: "JustInTime Event Administration",
                //generateTextFromHTML: true,
                text: "Hello "+event.name+" Here are the links for participation and administration of the event you recently created:\n" +
                "Event Title: "+event.title+
                "\nEvent Location: "+event.address+
                "\nParticipation link:\n"+
                "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + event._id + "/poll"+
                "\nAdministration link:\n"+
                "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + event._id + "/" + event.adminId + "/admin-table"
            };

            EventService.sendMail(mailOptions)
                .then(function(doc){
                },
                function(err){
                    console.log(err);
                });
        }
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
                $rootScope.event.invitedEmails = event.invited;
            }


            //console.log($rootScope.event.participate);
            console.log($rootScope.event._id);
            if($rootScope.event._id){
                EventService
                    .updateEventById($rootScope.event._id, $rootScope.event)
                    .then(function(response){
                        sendMail(response.data);
                        $rootScope.selectedDates=[];
                        $location.url('/event/' + $rootScope.event._id+ "/" + $rootScope.event.adminId + "/admin-table");
                    });
            }
            else{
                if (!$rootScope.currentUser) {
                    console.log("user is null");
                    EventService.createEvent($rootScope.event)
                        .then(function (response) {
                            sendMail(response.data);
                            sendmailAdmin(response.data);
                            if (response.data) {
                                //$rootScope.inviteurl = "localhost:3000/project/client/#/event/" + response.data._id + "/poll";
                                $rootScope.inviteurl = "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + response.data._id + "/poll";
                                //$rootScope.adminurl = "localhost:3000/project/client/#/event/" + response.data._id + "/" + response.data.adminId + "/admin-table";
                                $rootScope.adminurl = "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + response.data._id + "/" + response.data.adminId + "/admin-table";
                                EventService
                                    .setEvent(response.data);
                            }
                            $rootScope.selectedDates=[];
                            $location.url("/pollCreated");
                        });
                }

                else{
                    console.log($rootScope.currentUser);
                    console.log("creating for logged in user");
                    EventService
                        .createEventForUser($rootScope.currentUser._id,$rootScope.event)
                        .then(function(response) {
                            sendMail(response.data);
                            sendmailAdmin(response.data);
                            if (response.data) {
                                //$rootScope.inviteurl = "localhost:3000/project/client/#/event/" + response.data._id + "/poll";
                                $rootScope.inviteurl = "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + response.data._id + "/poll";
                                //$rootScope.adminurl = "localhost:3000/project/client/#/event/" + response.data._id + "/" + response.data.adminId + "/admin-table";
                                $rootScope.adminurl = "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + response.data._id + "/" + response.data.adminId + "/admin-table";
                                EventService
                                    .setEvent(response.data);
                            }
                            $rootScope.selectedDates=[];
                            $location.url("/pollCreated");
                        });

                }
                }
            }
            //$rootScope.event=null;

        }

})();
