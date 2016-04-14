(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('TimeController',TimeController);

    function TimeController($rootScope, $location) {

        var vm = this;
        vm.update = update;
        vm.change = change;
        vm.errormessage="";
        vm.timeSlotsArray = [1];
        $rootScope.event.schedule =[];

        for(var i = 0; i < $rootScope.selectedDates.length; i++){
           var temp=
               {
                   "date": $rootScope.selectedDates[i],
                   "times": []
                };
            $rootScope.event.schedule[i] = temp;

        }


        function change(n,d,index){
            for(var i = 0; i < $rootScope.event.schedule.length; i++){
                if(d === $rootScope.event.schedule[i].date){
                    if(n.getTime())
                    $rootScope.event.schedule[i].times[index] = n.getTime();
                }
            }
        }



        function update(){
            //console.log($rootScope.event.schedule);
            $location.url("/settings");

        }

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

        };
        vm.addSlots=function(){
            vm.timeSlotsArray.push(vm.timeSlotsArray.length+1);
        }
    }
})(window.angular);