(function() {
    'use strict';
    angular
        .module('EventSchedulerApp')
        .controller('responseRecordedController', responseRecordedController);

    function responseRecordedController($routeParams, EventService,$location) {
        var vm=this;
        vm.eventId = $routeParams.eventId;
        console.log(vm.eventId);




        function init() {
            EventService
                .findDetailsForEvent(vm.eventId)
                .then(
                    function(response){
                        vm.event=response.data;
                        vm.count = vm.event.participants.length;
                        console.log(vm.count);
                        vm.user=vm.event.participants[vm.count-1];
                    });

        }
        return init();



    }
})();