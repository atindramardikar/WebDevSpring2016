(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('DateController', function($rootScope, $location,EventService) {

            this.activeDate;

            if($rootScope.eventDetails.dateArray)
                $rootScope.selectedDates = $rootScope.eventDetails.dateArray;
            else
                $rootScope.selectedDates =[];

                    this.type = 'individual';

            this.removeFromSelected = function(dt) {
                $rootScope.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
            };

            this.updateDate= function(){
                $rootScope.eventDetails.dateArray = $rootScope.selectedDates;
                EventService.createEvent($rootScope.eventDetails);
                console.log($rootScope.eventDetails);
                $location.url("/timeProposal");
            }

        });
})(window.angular);