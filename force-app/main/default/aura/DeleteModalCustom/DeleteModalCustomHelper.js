({
	
    deleteData : function(component) {
        
        var action = component.get('c.deleteStudent');
        action.setParams({ studentId : component.get("v.currentStudentId") });
        
        console.log('==currentStudentId==');
        console.log(component.get("v.currentStudentId"));
        
        action.setCallback(this, function(actionResult){
            var state = actionResult.getState();
            if (state === "SUCCESS")
            {
                // Show message toast
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Delete",
                    "type": "success",
                    "message": "The record was deleted abc."
                });
                resultsToast.fire();
                $A.get('e.force:refreshView').fire();   
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            
        });
        
        $A.enqueueAction(action);
    }
})