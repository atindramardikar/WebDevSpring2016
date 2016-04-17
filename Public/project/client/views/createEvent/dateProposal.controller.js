(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('DateController', function(EventService, $rootScope, $location) {

            var vm =this;
            vm.errormessage=null;
            vm.activeDate;
            this.type = 'individual';

            vm.removeFromSelected = function(dt) {
                $rootScope.selectedDates.splice($rootScope.selectedDates.indexOf(dt), 1);
            };

            vm.updateDate= function(){
                if($rootScope.selectedDates.length==0) {
                    vm.errormessage = "Select atleast one date";
                    return;
                }else if ($rootScope.event.schedule.length==0){
                        //console.log("enter here");
                        for (var i = 0; i < $rootScope.selectedDates.length; i++) {
                            var temp =
                            {
                                "date": $rootScope.selectedDates[i],
                                "times": [{
                                    time: null,
                                    participants: []
                                }]
                            };
                            $rootScope.event.schedule[i] = temp;
                        }
                }
                else{
                    var schedule=[];
                    var participants=[];
                    var selected=$rootScope.selectedDates.slice();
                    for(var i in selected) {
                        for (var j in $rootScope.event.schedule) {
                            var temp=new Date($rootScope.event.schedule[j].date).setHours(0,0,0,0);
                            if (selected[i] == temp){
                                participants=$rootScope.event.schedule[j].times.slice();
                                schedule.push({
                                    "date":new Date($rootScope.event.schedule[j].date).setHours(0,0,0,0),
                                    "times":$rootScope.event.schedule[j].times
                                });
                                selected.splice(i,1);
                            }
                        }
                    }
                    var tempTimes=[];
                    for(var i=0;i<participants.length;i++){
                        tempTimes.push({
                            time: null,
                            participants: []
                        });
                    }
                    for(var i in selected) {
                        schedule.push({
                            "date": selected[i],
                            "times": tempTimes
                        });
                        }
                    $rootScope.event.schedule=schedule;
                }
                $location.url("/timeProposal");
            }

        });
})(window.angular);