({
    closeModel: function(component, event, helper) {
       component.set("v.isModalOpen", false);
    },
   
    getModalRecordData: function(component, event, helper) {
       var params = event.getParam('arguments');
       component.set("v.recordId", params.Id);
       component.set("v.isModalOpen", true);
    },
 })