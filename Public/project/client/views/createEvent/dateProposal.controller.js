(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('DateController', function($rootScope, $location) {

            var vm =this;
            vm.activeDate;
            vm.errormessage=null;
            if(!$rootScope.selectedDates)
                $rootScope.selectedDates =[];

                    this.type = 'range';

            vm.removeFromSelected = function(dt) {
                $rootScope.selectedDates.splice($rootScope.selectedDates.indexOf(dt), 1);
            };

            vm.updateDate= function(){
                if($rootScope.selectedDates.length==0) {
                    vm.errormessage = "Select atleast one date";
                    return;
                }
                $rootScope.event.dateArray = $rootScope.selectedDates;
                $location.url("/timeProposal");

            }

        });
})(window.angular);