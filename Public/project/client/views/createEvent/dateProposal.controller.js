(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('DateController', function($rootScope, $location,EventService) {

            this.activeDate;

            if($rootScope.eventDetails.dateArray)
                $rootScope.selectedDates = $rootScope.eventDetails.dateArray;
            else if($rootScope.event!= null)
                $rootScope.selectedDates= $rootScope.event.dateArray;
            else
                $rootScope.selectedDates =[];

                    this.type = 'individual';

            this.removeFromSelected = function(dt) {
                $rootScope.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
            };

            this.updateDate= function(){
                $rootScope.eventDetails.dateArray = $rootScope.selectedDates;
                if($rootScope.event == null) {
                    EventService.createEvent($rootScope.eventDetails);
                    $location.url("/timeProposal");
                }
                else{
                     var newEvent={
                         "_id": $rootScope.event._id,
                         "title": $rootScope.eventDetails.title,
                         "address": $rootScope.eventDetails.address,
                         "description": $rootScope.eventDetails.description,
                         "name": $rootScope.eventDetails.name,
                         "userId": $rootScope.event.userId,
                         "email": $rootScope.eventDetails.email,
                         "dateArray": $rootScope.eventDetails.dateArray
                     }
                    EventService.updateEventById($rootScope.event._id,newEvent);
                    $location.url("/timeProposal");
                }
            }

        });
})(window.angular);