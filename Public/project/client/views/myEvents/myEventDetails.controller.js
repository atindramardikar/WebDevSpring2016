"use strict";
(function () {
    angular
        .module("EventSchedulerApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, EventService){
        var vm = this;
        vm.id=$routeParams.eventId;

        function init(){
            EventService
                .findDetailsForEvent(vm.id)
                .then(function(response){
                    var event=response.data;
                    console.log(event);
                    vm.title=event.title;
                    vm.address=event.address;
                    vm.description=event.description;
                    vm.host=event.name;
                    vm.hostEmail=event.email;
                    vm.schedule=event.schedule;
                });
        }
        init();
    }
})();
