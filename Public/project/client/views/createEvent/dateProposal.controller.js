(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('DateController', function(EventService, $rootScope, $location) {

            var vm =this;
            vm.activeDate;
            vm.errormessage=null;
            if(!$rootScope.selectedDates)
                $rootScope.selectedDates =[];

                    this.type = 'individual';

            vm.removeFromSelected = function(dt) {
                $rootScope.selectedDates.splice($rootScope.selectedDates.indexOf(dt), 1);
            };

            vm.updateDate= function(){
                if($rootScope.selectedDates.length==0) {
                    vm.errormessage = "Select atleast one date";
                    return;
                }


             //   for(var i=0;i<$rootScope.selectedDates.length;i++) {
               //     $rootScope.event.schedule = [{"date": $rootScope.selectedDates[i], "times": ""}];
               // }
               // console.log($rootScope.event);
               // EventService.createEventForUser($rootScope.currentUser._id,$rootScope.event);
                $location.url("/timeProposal");

            }

        });
})(window.angular);