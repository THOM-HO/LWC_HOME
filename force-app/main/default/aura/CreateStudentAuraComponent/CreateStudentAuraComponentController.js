({
/** 
* Tên hàm :handleSuccess
* Chức năng của hàm : Hiển thị thông báo sau khi thêm học sinh thành công
* @param Tham số 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/  
    handleSuccess : function(component, event, helper) {
        component.find('notifLib').showToast({
            "variant": "success",
            "title": "Student Created",
            "message": "Record ID: " + event.getParam("id")
        });
        console.log('id'+event.getParam("id"));
    }
})