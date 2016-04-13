"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("EventController",EventController);

    function EventController(EventService,$location, $rootScope) {
        var vm = this;
        vm.update = update;
        vm.cu=null;
        vm.e=null;
        vm.errormessage=null;
        function init() {

        }
        return init();

        function update(event){

            if(event == null){
                vm.errormessage="Enter the required fields";
                return;
            }
            if(!event.title){
                vm.errormessage="Enter the event title";
                return;
            }
            if(!event.address){
                vm.errormessage="Enter the event location";
                return;
            }
            if(!event.description){
                vm.errormessage="Enter the event description";
                return;
            }
            if(!event.name){
                vm.errormessage="Enter your name";
                return;
            }
            if(!event.email){
                vm.errormessage="Enter your email";
                return;
            }
            $rootScope.event=
                {
                    "id":"",
                    "title": event.title,
                    "address": event.address,
                    "description": event.description,
                    "name": event.name,
                    "email": event.email
                };

             $location.url("/dateProposal");
        }


    }
})();