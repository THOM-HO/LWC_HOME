({
/** 
* Tên hàm :closeModel
* Chức năng của hàm : Đóng modal Update 
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
   closeModel: function(component, event, helper) {
      component.set("v.isModalOpen", false);
   },

/** 
* Tên hàm :getModalRecordData
* Chức năng của hàm : Hiển thị modal với thông tin của 1 học sinh cụ thể
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
   getModalRecordData: function(component, event, helper) {
      var params = event.getParam('arguments');
      component.set("v.recordId", params.Id);
      component.set("v.isModalOpen", true);
   },

/** 
* Tên hàm :closeModel
* Chức năng của hàm : Hiển thị modal với thông tin của 1 học sinh cụ thể
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
   handleSuccess : function(component, event, helper) {
      component.set("v.isModalOpen", false);
      component.find('notifLib').showToast({
         "variant": "success",
         "title": "Student Update",
         "message": "Record ID: " + event.getParam("id")
     });
     $A.get('e.force:refreshView').fire();
  },   
})