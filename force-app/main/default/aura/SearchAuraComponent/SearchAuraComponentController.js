({
/** 
* Tên hàm :init
* Chức năng của hàm : Khởi tạo dữ liệu ban đầu
* @param 
* @return Giá trị trả về 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    init : function (cmp, event, helper) {
        // các sự kiện của row
        var actions = [
            {label : 'Show details', name : 'show_details'},
            {label : 'Delete', name : 'delete'},
            {label : 'Update', name : 'update'},
        ];
        // Tên các cột của table
        cmp.set('v.columns', [
            {label : 'Họ', fieldName : 'HoHocSinh__c', type : 'text' , "cellAttributes" : {
                "class" : {
                    "fieldName" : "showClass"
                }
            }},
            {label : 'Tên', fieldName : 'TenHocSinh__c', type : 'text', "cellAttributes" : {
                "class" : {
                    "fieldName" : "showClass"
                }
            }},
            {label : 'Giới tính', fieldName : 'GioiTinh__c', type : 'text' , "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {label : 'Ngày Sinh', fieldName : 'NgaySinh__c', type : 'date', "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {label : 'Điểm 1', fieldName : 'Diem1__c', type : 'Number' , "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {label : 'Điểm 2', fieldName : 'Diem2__c', type : 'Number', "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {label : 'Điểm 3', fieldName : 'Diem3__c', type : 'Number' , "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {label : 'Điểm TB', fieldName : 'DiemTB__c', type : 'Number' , "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {label : 'Tình trạng', fieldName : 'TinhTrang__c', type : 'text', "cellAttributes" : {
                "class" : {
                    "fieldName": "showClass"
                }
            }},
            {type : 'action', typeAttributes : { rowActions: actions } , "cellAttributes" : {
                "class": {
                    "fieldName": "showClass"
                }
            }}
        ]);
        //lấy danh sách học sinh
        helper.getStudents(cmp);
        //lấy số lượng theo điều kiện search
        helper.getCountStudent(cmp);
        //lấy danh sách lớp
        helper.getClass(cmp);
    },

/** 
* Tên hàm :handleRowAction
* Chức năng của hàm : Xử lí các sự kiện sảy ra của 1 record
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    handleRowAction : function (cmp, event, helper) {
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
                var recordId = row.Id;
                cmp.find('edit_student_modal').getModalRecordData(recordId);
                break;
        }
    },

/** 
* Tên hàm :search
* Chức năng của hàm :tìm kiếm học sinh thỏa điều kiện
* @param 
* @return Giá trị trả về 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    search : function(cmp, event, helper) {
        // gán giá trị cho trang hiện tại bằng 1
        cmp.set('v.currentPage', 1);
        // lấy danh sách học sinh
        helper.getStudents(cmp);
        // lấy số lượng học sinh
        helper.getCountStudent(cmp);
    },

/** 
* Tên hàm :newStudent
* Chức năng của hàm : Gọi modal tạo mới học sinh
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    newStudent : function(cmp, event, helper) {
        cmp.find('create_student_modal').getModalRecordData();
    },

/** 
* Tên hàm :handleReloadEvent
* Chức năng của hàm : Khởi tạo mặt định
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    handleReloadEvent : function(cmp, event, helper) {
        cmp.set('v.currentPage', 1);
        helper.getStudents(cmp);
        helper.getCountStudent(cmp);
        helper.getClass(cmp);
    },

/** 
* Tên hàm :first
* Chức năng của hàm : lấy danh sách sinh viên thỏa điều kiện ở trang đầu
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    first : function(cmp, event, helper) {
        cmp.set('v.currentPage', 1);
        helper.getStudents(cmp);
    },

/** 
* Tên hàm :next
* Chức năng của hàm :  lấy danh sách sinh viên thỏa điều kiện ở trang tiếp theo
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    next : function(cmp, event, helper) {
        cmp.set('v.currentPage', cmp.get('v.currentPage') + 1);
        helper.getStudents(cmp);
    },

/** 
* Tên hàm :previous
* Chức năng của hàm :  lấy danh sách sinh viên thỏa điều kiện ở trang trước
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    previous : function(cmp, event, helper) {
        cmp.set('v.currentPage', cmp.get('v.currentPage') - 1);
        helper.getStudents(cmp);
    },

/** 
* Tên hàm :last
* Chức năng của hàm :  lấy danh sách sinh viên thỏa điều kiện ở trang cuối
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    last : function(cmp, event, helper) {
        cmp.set('v.currentPage', cmp.get('v.totalSize'));
        helper.getStudents(cmp);
    },

/** 
* Tên hàm :deleteSelectedAll
* Chức năng của hàm : Xử lí sự kiện khi check checkbox
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    deleteSelectedAll : function(cmp, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var listId = [];
        for (const item of selectedRows) {
            listId.push(item.Id);
          }
        cmp.set('v.listSelectCheckbox', listId);
    },

/** 
* Tên hàm :deleteAll
* Chức năng của hàm : Xóa các học sinh được check, gọi modal xóa
* @param 
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:  
*/ 
    deleteAll : function(cmp, event, helper) {
        var listId = cmp.get('v.listSelectCheckbox') ;
        console.log(listId);
        cmp.find('confirm_deleteAll_modal').confirmDeleteModal(listId);
    },
    
});