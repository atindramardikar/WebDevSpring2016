
(function() {
    'use strict';
    angular
        .module('EventSchedulerApp')
        .controller('AdminTableController', AdminTableController);

    function AdminTableController($routeParams, EventService,$rootScope) {
        var vm=this;
        vm.eventId = $routeParams.eventId;
        vm.adminId= $routeParams.adminId;
        vm.edit=edit;
        vm.remove = remove;
        vm.update=update;
        vm.updateEvent=updateEvent;
        vm.refresh = refresh;
        vm.updatedate=updatedate;
        vm.sendMail=sendMail;
        vm.sendReminder = sendReminder;
        window.onbeforeunload=null;
        vm.participationLink="";
        vm.closePoll=closePoll;
        function init(){
            EventService
                .findDetailsForEvent(vm.eventId)
                .then(function (response) {
                    vm.event = response.data;
                    $rootScope.event=response.data;
                    });
        }
        init();
        vm.participationLink="http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + vm.eventId + "/poll";

        function closePoll(){
            vm.event.closePoll=true;
            EventService
                .updateEventById(vm.eventId, vm.event)
                .then(function(response){
                    init();
                    vm.message="Poll Closed"
                });
        }

        function remove(dateId, timeId, participationIndex){
            for(var i in vm.event.schedule){
                if(dateId == vm.event.schedule[i]._id){
                    console.log(vm.event.schedule[i]._id);
                    for(var j in vm.event.schedule[i].times){
                        if(timeId == vm.event.schedule[i].times[j]._id){
                            console.log(vm.event.schedule[i].times[j].participants);
                            vm.event.schedule[i].times[j].participants.splice(participationIndex,1);
                        }
                    }
                }
            }
            EventService
                .updateEventById(vm.eventId, vm.event)
                .then(function(response){
                    init();
                    vm.message="Deleted Successfully"
                });
        }

        function update(newName){
            for(var i in vm.event.schedule){
                if(vm.dateId == vm.event.schedule[i]._id){
                    //console.log(vm.event.schedule[i]._id);
                    for(var j in vm.event.schedule[i].times){
                        if(vm.timeId == vm.event.schedule[i].times[j]._id){
                            //console.log(vm.event.schedule[i].times[j].participants);
                            vm.event.schedule[i].times[j].participants[vm.index]=newName;
                        }
                    }
                }
            }
            EventService
                .updateEventById(vm.eventId, vm.event)
                .then(function(response){
                    init();
                    vm.message="Updated Successfully"
                });
        }
        function edit(p,dateId,timeId,index){
            vm.participant=p;
            vm.dateId=dateId;
            vm.timeId=timeId;
            vm.index=index;
        }

        function updateEvent(){
            EventService
                .updateEventById(vm.eventId, vm.event)
                .then(function(response){
                    init();
                    vm.message="Updated Successfully"
                });
        }

        function refresh(){
            init();
        }
        function updatedate(){
            $rootScope.selectedDates=[];
            for(var i in vm.event.schedule){
                $rootScope.selectedDates.push(new Date(vm.event.schedule[i].date).setHours(0,0,0,0));
            }
        }

        function sendMail() {
            // var invitees=[];
            if (vm.invited) {
                vm.invited.trim();
                vm.event.invitedEmails = vm.event.invitedEmails + "," + vm.invited;
                var mailOptions = {
                    from: "justintime.scheduler@gmail.com",
                    to: vm.invited,
                    subject: "JustInTime Event Invitation",
                    //generateTextFromHTML: true,
                    text: "Hello, \n" + vm.event.name + " has invited you to participate in the following event:\n" +
                    "Event Title: " + vm.event.title +
                    "\nEvent Location: " + vm.event.address +
                    "\nParticipation link:\n" +
                    "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + vm.event._id + "/poll"
                };
                EventService.sendMail(mailOptions)
                    .then(function (response) {
                        console.log(response.data);
                    });
                //$location.url('/event/'+vm.eventId+'/admin-administration');
                vm.invited = null;
                EventService.updateEventById(vm.event._id, vm.event)
                    .then(init);
            }
        }

        function sendReminder() {
            // var invitees=[];
                var mailOptions = {
                    from: "justintime.scheduler@gmail.com",
                    to: vm.event.invitedEmails,
                    subject: "JustInTime Event Invitation",
                    //generateTextFromHTML: true,
                    text: "Hello, \n" + vm.event.name + " has invited you to participate in the following event:\n" +
                    "Event Title: " + vm.event.title +
                    "\nEvent Location: " + vm.event.address +
                    "\nParticipation link:\n" +
                    "http://webdev2016-mardikaratindra.rhcloud.com/project/client/#/event/" + vm.event._id + "/poll"
                };
                EventService.sendMail(mailOptions)
                    .then(function (response) {
                        if(response) {
                            $('#myModal5').modal('show');
                        }
                    },
                    function(err){
                    });
                //$location.url('/event/'+vm.eventId+'/admin-administration');
                vm.invited = null;
                EventService.updateEventById(vm.event._id, vm.event)
                    .then(init);
            }
    }
})();