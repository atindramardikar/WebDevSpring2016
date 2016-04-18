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
        window.onbeforeunload = function(e) {
            $location.url('/event');
            return 'Your Poll is not yet saved..';
         };
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
            if(!event.name){
                vm.errormessage="Enter your name";
                return;
            }
            if(!event.email){
                vm.errormessage="Enter your email";
                return;
            }
            if(!$rootScope.event) {
                $rootScope.event=null;
                $rootScope.event =
                {
                    "id": "",
                    "title": event.title,
                    "address": event.address,
                    "description": event.description,
                    "name": event.name,
                    "email": event.email
                };
            }
            if(!$rootScope.selectedDates) {
                $rootScope.selectedDates = [];
                //$rootScope.event.schedule = [];
            }
            console.log($rootScope.event);

            if(!$rootScope.event.schedule) {
                console.log("go no");
                $rootScope.event.schedule = [];
            }
            else{
                console.log("go");
            }




             $location.url("/dateProposal");
        }


    }
})();