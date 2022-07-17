({
/** 
* Tên hàm :getStudents
* Chức năng của hàm :query danh sách học sinh theo điều kiện
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    getStudents : function(cmp) {
        var action = cmp.get('c.queryStudent');
        // truyền param
        action.setParams({lastName : cmp.get("v.name"), 
                        isSort : cmp.get("v.isSort"),
                        classId: cmp.get("v.class"),
                        startBirthday:cmp.get("v.startBirthday"),
                        endBirthday: cmp.get("v.endBirthday") ,
                        currentPage:cmp.get("v.currentPage")});

        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            var listStudent = [];
            if (state === "SUCCESS")
            {
                let listResult = actionResult.getReturnValue();
                for(let student of listResult){
                    // const source = { isSelected: false};
                    Object.assign(student,{ GioiTinh__c: student.GioiTinh__c ? "Nam" : "Nữ" });
                    listStudent.push(student);
                }
                //
                listStudent.forEach(function(item){ 
                //background của từng dòng
                    item.showClass = (item.DiemTB__c < 5 ? 'background' : null);
                });
                cmp.set('v.students', listStudent);
                //
            } else if (state === "ERROR") {
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

    /** 
* Tên hàm :getCountStudent
* Chức năng của hàm :get số lượng học sinh theo điều kiện
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    getCountStudent : function(cmp) {

        var action = cmp.get('c.countStudent');
        action.setParams({ lastName : cmp.get("v.name"), 
                        isSort : cmp.get("v.isSort"),
                        classId : cmp.get("v.class"),
                        startBirthday : cmp.get("v.startBirthday"),
                        endBirthday : cmp.get("v.endBirthday")});
        action.setCallback(this, function(actionResult){
            var state = actionResult.getState();
            console.log('===state get count  students===' + state);
            var listStudent = [];
            if (state === "SUCCESS") {
                var countStudent = actionResult.getReturnValue();
                cmp.set('v.countStudent', countStudent);
                //totalSize
                var totalSize = Math.ceil(countStudent / 5);
                cmp.set('v.totalSize', totalSize);
                cmp.set('v.paginationList', Array.from(Array(totalSize)).map((a, b)=> b + 1));
            } else if (state === "ERROR") {
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

    /** 
* Tên hàm :getClass
* Chức năng của hàm : query danh sách lớp
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    getClass : function (cmp) {
        var action = cmp.get("c.methodGetDataClass");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let listClass = response.getReturnValue();
                cmp.set('v.listClass', listClass);
            }
            else if (state === "ERROR") {
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

});