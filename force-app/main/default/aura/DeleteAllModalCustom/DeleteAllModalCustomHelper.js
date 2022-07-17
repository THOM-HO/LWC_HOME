({
/** 
* Tên hàm :deleteStudentAll
* Chức năng của hàm : Xóa List học sinh 
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    deleteStudentAll:function (cmp) {
        // console.log('listId: '+JSON.stringify(cmp.get("v.listId")));
        var action = cmp.get('c.deleteAllStudent');
        action.setParams({ listDelete : cmp.get("v.listId") });// lấy list Id cần xóa
        
        action.setCallback(this, function(actionResult){
            var state = actionResult.getState();
            if (state === "SUCCESS")
            {
                // Show message toast
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Delete All",
                    "type": "success",
                    "message": "Records was deleted."
                });
                resultsToast.fire();
                //refresh view
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
    },
})