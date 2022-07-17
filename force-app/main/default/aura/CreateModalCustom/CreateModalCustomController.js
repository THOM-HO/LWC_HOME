({
/** 
* Tên hàm :closeModel
* Chức năng của hàm : Đóng modal
* @param Tham số 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    closeModel: function(component, event, helper) {
       component.set("v.isModalOpen", false);
    },

/** 
* Tên hàm :getModalRecordData
* Chức năng của hàm : Hiển thị modal
* @param Tham số 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/
    getModalRecordData: function(component, event, helper) {
       component.set("v.isModalOpen", true);
    },

/** 
* Tên hàm :handleSuccess
* Chức năng của hàm : Đóng modal và hiển thị thông báo sau khi thêm học sinh thành công
* @param Tham số 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/  
    handleSuccess : function(component, event, helper) {
      component.set("v.isModalOpen", false);
      component.find('notifLib').showToast({
         "variant": "success",
         "title": "Student Created",
         "message": "Record ID: " + event.getParam("id")
     });
     $A.get('e.force:refreshView').fire();
  }
 })