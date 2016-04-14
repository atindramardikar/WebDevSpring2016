(function() {
    'use strict';
        angular
            .module('EventSchedulerApp')
            .controller('PollController', PollController);

    function PollController($routeParams, EventService) {

        var eventId = $routeParams.eventId;
        console.log(eventId);
        var vm=this;
        vm.slots=[];


        EventService
            .findDetailsForEvent(eventId)
            .then(
                function(response){
                    console.log(response.data);
                    vm.event=response.data;
                    console.log(vm.event);
                    for(var i in vm.event.schedule){
                        console.log(vm.event.schedule[i]);
                        for(var j in vm.event.schedule[i].times){
                            console.log();
                            vm.slots.push(vm.event.schedule[i].times[j]);
                        }
                    }
                    console.log(vm.slots);
                });

    }
})();