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
            vm.form = null;
        }

        init();

        function renderForms(response){
            vm.userForms = response.data;
        }

        function addForm(form) {
            FormService
                .createFormForUser($rootScope.currentUser._id, form)
                .then(init);
        }

        function updateForm(form){
            FormService
                .updateFormById(form._id, form)
                .then(init);
        }

        function selectForm(index){
            vm.form = vm.userForms[index];
        }

        function deleteForm(index){
            FormService
                .deleteFormById(vm.userForms[index]._id)
                .then(init);
        }
    }
})();