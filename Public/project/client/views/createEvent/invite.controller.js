"use strict";
(function()
{
    angular
        .module("EventSchedulerApp")
        .controller("InviteController",InviteController);
    function InviteController($rootScope, $location){
        var vm=this;
        vm.update= function(){
            $rootScope.event=null;
            $location.url("/myEvents");
        }
    }
})();
