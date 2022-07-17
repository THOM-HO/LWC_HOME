({
/** 
* Tên hàm :openModel
* Chức năng của hàm : Hiển thị modal
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/  
   openModel: function(component, event, helper) {
       component.set("v.isModalOpen", true);
   },
 
/** 
* Tên hàm :closeModel
* Chức năng của hàm :Đóng modal
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
   closeModel: function(component, event, helper) {
       component.set("v.isModalOpen", false);
   },
 
/** 
* Tên hàm :deleteAllRecordData
* Chức năng của hàm : Xóa học sinh 
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
   deleteAllRecordData: function(component, event, helper) {
       component.set("v.isModalOpen", false);
       helper.deleteStudentAll(component);

   },
   
/** 
* Tên hàm :confirmDeleteModal
* Chức năng của hàm : getParam và hiên thị modal
* @param
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
   confirmDeleteModal: function(component, event, helper) {
       var list = event.getParam('arguments');
       component.set("v.listId", list.listId);
       // hien thi modal 
       component.set("v.isModalOpen", true);
   },
 })