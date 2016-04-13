(function() {
    'use strict';
        angular
            .module('EventSchedulerApp')
            .controller('PollController', PollController);

    function PollController($routeParams, EventService) {

        var eventId = $routeParams.eventId;
        console.log(eventId);
        var vm=this;


        EventService
            .findDetailsForEvent(eventId)
            .then(
                function(response){
                    console.log(response.data);
                    vm.event=response.data;
                });

    }
})();