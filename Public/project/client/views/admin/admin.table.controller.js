
(function() {
    'use strict';
    angular
        .module('EventSchedulerApp')
        .controller('AdminTableController', AdminTableController);

    function AdminTableController($routeParams, EventService) {
        var vm=this;
        vm.eventId = $routeParams.eventId;
        console.log(vm.eventId);
        vm.slots=[];


        EventService
            .findDetailsForEvent(vm.eventId)
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