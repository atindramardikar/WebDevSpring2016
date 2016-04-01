(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http) {

        var api = {
            createField: createField,
            findField: findField,
            findFieldsByForm: findFieldsByForm,
            deleteField: deleteField,
            updateField: updateField,
            sortField: sortField
        };

        return api;

        function createField (formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function findField (formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByForm (formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function deleteField (formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function sortField(formId, startIndex, endIndex) {
            return $http.put("/api/assignment/"+formId+"/form?startIndex="+startIndex+"&endIndex="+endIndex);
        }

    }
})();