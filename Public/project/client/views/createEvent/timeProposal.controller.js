(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('TimeController',TimeController);

    function TimeController($rootScope, $location) {

        var vm = this;

            vm.timeSlotsArray = [1];


        this.type = 'individual';

        vm.removeFromSelected = function (dt) {
            $rootScope.selectedDates.splice($rootScope.selectedDates.indexOf(dt), 1);
            if($rootScope.selectedDates.length == 0){
                $location.url("/dateProposal");
            }
        };

        vm.updateDate = function () {
            console.log($rootScope.selectedDates);
            if ($rootScope.selectedDates.length == 0) {
                vm.errormessage = "Select atleast one date";
                return;
            }
            $rootScope.event.dateArray = $rootScope.selectedDates;
            $location.url("/timeProposal");

        }
        vm.addSlots=function(){
            vm.timeSlotsArray.push(vm.timeSlotsArray.length+1);
        }
    }
})(window.angular);