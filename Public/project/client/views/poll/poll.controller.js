(function() {
    'use strict';
        angular
            .module('EventSchedulerApp')
            .controller('PollController', PollController);

    function PollController($routeParams, EventService,$location) {
        var vm = this;
        vm.eventId = $routeParams.eventId;
        console.log(vm.eventId);
        window.onbeforeunload=null;
        vm.slots = [];
        vm.event = null;
        vm.save = save;
        vm.error = error;
        vm.cannot=cannot;
        vm.participants = [];
        vm.dates = [];
        vm.times = [];
        vm.pollmessage="";
        vm.dateSelected = dateSelected;

        function init() {
           // vm.successMessage=null;
            vm.dates = [];
            vm.times = [];
            vm.dateOption = null;
            vm.newParticipant = null;
            EventService
                .findDetailsForEvent(vm.eventId)
                .then(
                    function (response) {

                        vm.event = response.data;
                        vm.hiddenPoll = response.data.hidden;
                        vm.closePoll=response.data.closePoll;
                        if(vm.closePoll) {
                            vm.pollmessage = "Sorry, this poll is closed";
                        }
                        console.log(vm.event.limitNumber);
                        if (vm.event.limit) {
                            var flag = false;
                            for (var i in vm.event.schedule) {
                                for (var j in vm.event.schedule[i].times) {
                                    console.log(vm.event.schedule[i].times[j].participants.length);
                                    if (vm.event.schedule[i].times[j].participants.length < vm.event.limitNumber) {
                                        flag = true;
                                    }
                                }
                                if (flag)
                                    vm.dates.push(vm.event.schedule[i].date);
                            }
                        }
                        else {
                            //console.log("herre");
                            for (var i in vm.event.schedule) {
                                //console.log(Date.parse(vm.event.schedule[i].date));
                                vm.dates.push(vm.event.schedule[i].date);
                            }
                        }
                    });

        }

        init();

        function dateSelected(date) {
            //console.log(Date.parse(date));
            vm.times = [];
            for (var i in vm.event.schedule) {
                if (Date.parse(date) == Date.parse(vm.event.schedule[i].date)) {
                    //console.log("atat");
                    for (var j in vm.event.schedule[i].times) {
                        if (vm.event.limit) {
                            if (vm.event.schedule[i].times[j].participants.length < vm.event.limitNumber) {
                                vm.times.push(vm.event.schedule[i].times[j].time);
                            }
                        }
                        else {
                            vm.times.push(vm.event.schedule[i].times[j].time);
                            //console.log(new Date(vm.event.schedule[i].times[j].time).toString().substr(16, 8));
                        }
                    }
                }

            }
        }

        function save(participant, date, time) {
            console.log(time);

            for (var i in vm.event.schedule) {
                if (Date.parse(date) == Date.parse(vm.event.schedule[i].date)) {
                    console.log("date matches");
                    for (var j in vm.event.schedule[i].times) {
                        if (time == vm.event.schedule[i].times[j].time) {
                            console.log("time matches");
                            vm.event.schedule[i].times[j].participants.push(participant);
                        }
                    }
                }
            }
            //vm.participants.push(participant);
            //vm.event.participants = vm.participants;
            //vm.event.newParticipant = participant;
            console.log("here");
            EventService
                .updateEventById(vm.event._id, vm.event)
                .then(function (response) {
                    vm.errormessage = null;
                    vm.successMessage = "Response saved successfully";
                    init();
                });


        }

        function error(participant, date,time) {
            vm.successMessage=null;
            if (!participant) {
                vm.errormessage = "Please enter Name";
                return;
            }

            if (!date) {
                vm.errormessage = "Please select Date";
                return;
            }
            if (!time) {
                vm.errormessage = "Please select a time slot";
                return;
            }
            $('#myModal2').modal('show');

        }

        function cannot(participant){
            if (!participant) {
                vm.errormessage = "Please enter Name";
                return;
            }
            vm.event.nonParticipants.push(participant);
            EventService.updateEventById(vm.event._id, vm.event)
                .then(function (response) {
                    vm.errormessage = null;
                    vm.successMessage = "Response saved successfully";
                    init();
                });
        }
    }
})();