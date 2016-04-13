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


        function init() {

        }
        return init();



    }
})();
