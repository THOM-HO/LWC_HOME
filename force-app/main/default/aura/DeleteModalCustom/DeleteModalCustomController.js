({
   openModel: function(component, event, helper) {
      component.set("v.isModalOpen", true);
   },
  
   closeModel: function(component, event, helper) {
      component.set("v.isModalOpen", false);
   },
  
   deleteRecordData: function(component, event, helper) {
      component.set("v.isModalOpen", false);
      helper.deleteData(component);
   },
   
   confirmDeleteModal: function(component, event, helper) {
      var params = event.getParam('arguments');
      component.set("v.currentStudentId", params.Id);
      // hien thi modal 
      component.set("v.isModalOpen", true);
   },
})