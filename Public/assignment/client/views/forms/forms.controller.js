(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location, FormService, $rootScope) {

        var vm = this;

        vm.deleteForm = deleteForm;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.userForms = [];
        vm.form = null;

        function init () {
            FormService
                .findAllFormsForUser($rootScope.currentUser._id)
                .then(renderForms);
        }

        function renderForms(response){
            vm.userforms = response.data;
        }

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

        function updateForm(title){
            var updateForm={
                "_id":$scope.selectedForm._id,
                "title":title,
                "userId":$scope.selectedForm.userId
            };
            FormService.updateFormById(updateForm._id,updateForm,function(forms){
                getFormsforUser();
            });
            $scope.form=null;
        }

        function selectForm(index){
            $scope.selectedForm=$scope.userForms[index];
            console.log($scope.selectedForm.title);
            $scope.form=$scope.selectedForm;
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.userForms[index]._id,function(forms){
                    getFormsforUser();
                }
            );
        }
    }
})();