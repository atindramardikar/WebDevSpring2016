/**
 * Created by Sanjanamanoj on 4/3/2016.
 */
"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("PollCreatedController",PollCreatedController);

    function PollCreatedController(EventService,$location, $rootScope) {
        var vm = this;
        vm.navigate = navigate;

        function navigate()
        {
            $location.url("/event/{{event._id}}/poll");
        }

        function init() {

        }
        return init();



    }
})();
