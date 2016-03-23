(function(angular) {
    'use strict';

    angular.module('EventSchedulerApp')
        .controller('DateController', function($rootScope) {
            this.activeDate;
            $rootScope.selectedDates = [];
            this.type = 'individual';

            this.removeFromSelected = function(dt) {
                $rootScope.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
            }

        });
})(window.angular);
