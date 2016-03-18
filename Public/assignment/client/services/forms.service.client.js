(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;
        $rootScope.userforms=model.forms;
        function createFormForUser(userId, form, callback){
            form._id=(new Date).getTime();
            form.userId=userId;
            model.forms.push(form);
            callback(form);
        }
        function findAllFormsForUser(userId, callback){
            var userForms=[];
            for(var form in model.forms){
                if(model.forms[form].userId==userId){
                    userForms.push(model.forms[form]);
                }
            }
            callback(userForms);
        }
        function deleteFormById(formId, callback){
            for(var form in model.forms){
                if(model.forms[form]._id==formId){
                    model.forms.splice(form,1);
                    break;
                }
            }
            callback(model.forms);
        }
        function updateFormById(formId, newForm, callback){
            for(var form in model.forms){
                if(form._id==formId){
                    form=newForm;
                    callback(form);
                    break;
                }
            }
        }
    }
    })();
