(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('TimeController',TimeController);

    function TimeController($rootScope, $location) {

        var vm = this;
        vm.update = update;
        vm.change = change;
        vm.timeval='12:00';
        vm.errormessage="";
        vm.timeSlotsArray = [1];
        //vm.alltimes=[];
        var x = 5; //minutes interval
        vm.alltimes = []; // time array
        var tt = 0; // start time
        var ap = ['AM', 'PM']; // AM-PM

//loop to increment the time and push results in array
        for (var i=0;tt<24*60; i++) {
            var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
            var mm = (tt%60); // getting minutes of the hour in 0-55 format
            vm.alltimes[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
        //$rootScope.event.schedule =[];

        /*for(var i = 0; i < $rootScope.selectedDates.length; i++){
           var temp=
               {
                   "date": $rootScope.selectedDates[i],
                   "times": [{
                       time: null,
                       participants:[]
                   }]
                };
            $rootScope.event.schedule[i] = temp;

        }*/


        function change(n,d,index){
            for(var i = 0; i < $rootScope.event.schedule.length; i++){
                if(d === $rootScope.event.schedule[i].date){
                    //if(n.getTime())
                    //n=new Date(new Date(n).getHours()+":"+new Date(n).getMinutes());
                    console.log(n);
                    $rootScope.event.schedule[i].times[index] = {time:n, participants:[]};
                }
            }
            console.log($rootScope.event.schedule);
        }



        function update(){
            //console.log($rootScope.event.schedule);
            for(var i in $rootScope.event.schedule){
                var flag= false;
                for(var j in $rootScope.event.schedule[i].times){
                    if($rootScope.event.schedule[i].times[j].time){
                        flag=true;
                    }
                    if(!flag){
                        vm.errormessage = "Please enter atleast one time slot for each date";
                        return;
                    }
                }
            }
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

            //vm.timeSlotsArray.push(vm.timeSlotsArray.length+1);
            for(var i in $rootScope.event.schedule){
                    $rootScope.event.schedule[i].times.push({"time":null,"participants":[]});
            }
        }
    }
})(window.angular);