({
    init: function (cmp, event, helper) {
        var actions = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Delete', name: 'delete' },
            { label: 'Update', name: 'update' },
        ];
        cmp.set('v.columns', [
            { label: 'Họ', fieldName: 'HoHocSinh__c', type: 'text' },
            { label: 'Tên', fieldName: 'TenHocSinh__c', type: 'text' },
            { label: 'Giới tính', fieldName: 'GioiTinh__c', type: 'text' },
            { label: 'Ngày Sinh', fieldName: 'NgaySinh__c', type: 'date' },
            { label: 'Điểm 1', fieldName: 'Diem1__c', type: 'Number' },
            { label: 'Điểm 2', fieldName: 'Diem2__c', type: 'Number' },
            { label: 'Điểm 3', fieldName: 'Diem3__c', type: 'Number' },
            { label: 'Điểm TB', fieldName: 'DiemTB__c', type: 'Number' },
            { label: 'Tình trạng', fieldName: 'TinhTrang__c', type: 'text' },
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        helper.getStudents(cmp);
        helper.getCountStudent(cmp);
        helper.getClass(cmp);
    },

    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'show_details':
                var recordId = row.Id;
                cmp.find('detail_student_modal').getModalRecordData(recordId);
                break;
            case 'delete':
                var recordId = row.Id;
                cmp.find('confirm_delete_modal').confirmDeleteModal(recordId);
                break;
            case 'update':
                // alert('Showing update: ' + JSON.stringify(row));
                var recordId = row.Id;
                console.log('==recordId==' + row.Id);
                cmp.find('edit_student_modal').getModalRecordData(recordId);
                break;
        }
    },

    search: function(cmp, event, helper) {
        console.log('==seachItems==');
        helper.getStudents(cmp);
    },

    newStudent : function(cmp, event, helper) {
        cmp.find('create_student_modal').getModalRecordData();
    },

    handleReloadEvent: function(component, event, helper) {
        console.log('==handleReloadEvent==');
        helper.getStudents(component);
    },

    first:function(component, event, helper) {
        helper.getStudents(component);
    },
    
});