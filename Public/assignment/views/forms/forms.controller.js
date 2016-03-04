(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location, $scope, FormService, $rootScope) {
        $scope.addForm = addForm
        $scope.updateForm = updateForm
        getFormsforUser();

        function getFormsforUser(){
        FormService.findAllFormsForUser($rootScope.currentUser._id, function(userForms){
            $scope.userForms=userForms;
        })
        }
        function addForm(form) {
          FormService.createFormForUser($rootScope.currentUser._id,form,function(form){
              getFormsforUser();
          })
        }
        function updateForm(form){

        }

    }
})();