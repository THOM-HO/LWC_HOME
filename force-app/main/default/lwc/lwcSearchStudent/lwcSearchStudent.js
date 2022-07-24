import { LightningElement, api, wire} from 'lwc';
import getListClass from '@salesforce/apex/lwcSearchStudentController.getListClass';
import getListStudent from '@salesforce/apex/lwcSearchStudentController.getListStudent';
import getCountStudent from '@salesforce/apex/lwcSearchStudentController.getCountStudent';
import {loadStyle} from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'
// các sự kiện
const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
    { label: 'Update', name: 'update' },
];
//các cột
const cols = [
    {label : 'Họ', fieldName : 'HoHocSinh__c', type : 'text',"cellAttributes" : { "class" : { "fieldName" : "showClass" }}},
    {label : 'Tên', fieldName : 'TenHocSinh__c', type : 'button', typeAttributes : {label : {fieldName : 'TenHocSinh__c'}, variant : 'base', name : 'view'}, "cellAttributes" : {"class" : { "fieldName" : "showClass" }}},
    {label : 'Giới tính', fieldName : 'GioiTinh__c', type : 'text' , "cellAttributes" : {"class" : {"fieldName": "showClass" }}},
    {label : 'Ngày Sinh', fieldName : 'NgaySinh__c', type : 'text', "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm 1', fieldName : 'Diem1__c', type : 'Number' , "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm 2', fieldName : 'Diem2__c', type : 'Number', "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm 3', fieldName : 'Diem3__c', type : 'Number' , "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm TB', fieldName : 'DiemTB__c', type : 'Number' , "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Tình trạng', fieldName : 'TinhTrang__c', type : 'text', "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {type : 'action', typeAttributes : { rowActions: actions } , "cellAttributes" : { "class": {"fieldName": "showClass" }}}
]

/**
* ClassName: LwcSearchStudent
* ClassDetail: chứa các function cho component search
* @created: 2022/06/22 Nguyen Van A
* @modified:
*/
export default class LwcSearchStudent extends LightningElement {
    //điều kiện tìm kiếm theo tên
    @api lastName= '';
    //điều kiện check sắp xếp tăng dần
    @api isCheck = false;
    //điều kiện lớp
    @api value = '';
    //điều kiện ngày sinh bắt đầu 
    @api startDay ='';
    //điều kiện ngày sinh kết thúc
    @api endDay = '';

    //chứa dnh sách lớp
    @api listClass;   
    //chứa danh sách học sinh
    @api listStudent;   
    //thông báo lỗi
    @api error;

    //đếm số lượng học sinh theo điều kiện search
    @api countStudent = 0;
    //trang đang đứng hiện tại 
    @api currentPage = 1;
    //giới hạn số dòng hiển thị và tìm kiếm
    @api LIMIT_RECORD = 5;
    //tổng số trang
    @api totalPage = 0;
    //cờ hiện vùng phân trang hay không
    @api flagPagination = false;

    //cờ hiện button điều hướng trang đầu tiên
    @api isFirstPage = false;
    //cờ hiện button điều hướng trang trước
    @api isPreviousPage = false;
    //cờ hiện button điều hướng trang kế tiếp
    @api isNextPage = false;
    //cờ hiện button điều hướng trang cuối cùng
    @api isLastPage = false;

    //chứa record đang được chọn
    @api recordId ;
    //chứa ds record đang được chọn
    @api selectedListId = [];
    
    //các cột của table
    cols = cols;
    //chờ hiện css
    isCssLoaded = false

/** 
* Tên hàm :wiredListClass
* Chức năng của hàm : lấy danh sách lớp khi trang load lên 
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    @wire(getListClass) wiredListClass({ error, data }) {
        if (data) {
            this.listClass = data; 
            var listViewData = [{"label":'Tất cả', "value":''}];
            for(var i=0; i<this.listClass.length; i++){
                listViewData.push({"label" : this.listClass[i].TenLop__c, "value" : this.listClass[i].Id});
            }
            this.listClass = listViewData;
        } else if (error) { 
           this.error = error;  
        }
    }

/** 
* Tên hàm :connectedCallback
* Chức năng của hàm : init dữ liệu khi load trang
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    connectedCallback(){
        this.getListStudent();
        this.getCountStudent();
    }

/** 
* Tên hàm :handleChangeClass
* Chức năng của hàm : thay đổi lớp được chọn
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleChangeClass(event) {
        this.value = event.detail.value;
    }

/** 
* Tên hàm :handleChangeText
* Chức năng của hàm : change dữ liệu biến lastName
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleChangeText(event) {
        this.lastName = event.target.value;
    }

/** 
* Tên hàm :handleChangeCheckBox
* Chức năng của hàm : change dữ liệu của checkbox sắp xếp
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleChangeCheckBox(event) {
        this.isCheck = event.target.checked;
    }

/** 
* Tên hàm :handleChangeStartDay
* Chức năng của hàm : change dữ liệu ngày sinh bắt đầu
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleChangeStartDay(event){
        this.startDay = event.target.value;
    }

/** 
* Tên hàm :handleChangeEndDay
* Chức năng của hàm : change dữ liệu ngày sinh kết thúc 
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleChangeEndDay(event){
        this.endDay = event.target.value;
    }

/** 
* Tên hàm :handleSearch
* Chức năng của hàm : tìm kiếm danh sách học sinh và đếm số lượng
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleSearch(event) {
        //khi tìm thì ẩn phân trang
        this.flagPagination = false;
        //set cho currentPage về lại 1
        this.currentPage = 1;
        //lấy danh sách học sinh
        this.getListStudent();
        //lấy số lượng học sinh theo điều kiện
        this.getCountStudent();
    }

/** 
* Tên hàm :handleRowAction
* Chức năng của hàm : sự kiện của table
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                //gọi hàm hiển thị modal delete
                this.deleteRow(row);
                break;
            case 'show_details':
                //gọi hàm hiển thị modal showdetail
                this.showRowDetails(row);
                break;
            case 'update':
                //gọi hàm hiển thị modal update
                this.updateRow(row);
                break;
            case 'view':
                //gọi hàm hiển thị modal showdetail
                this.showRowDetails(row);
                break;
            default:
        }
    }

/** 
* Tên hàm :deleteRow
* Chức năng của hàm :xóa 1 record
* @param row được truyền vào
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    deleteRow(row) {
        const {Id} = row;
        this.selectedListId = [Id]
        const modalDeleteStudent = this.template.querySelector("c-lwc-modal-delete-student");
        modalDeleteStudent.show();
    }

/** 
* Tên hàm :showRowDetails
* Chức năng của hàm : hiển thị modal chi tiết 1 record
* @param row: record được chọn
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    showRowDetails(row) {
        const {Id} = row;
        this.recordId = Id;
        const modalView = this.template.querySelector("c-lwc-modal-view-student");
        modalView.show();
    }

/** 
* Tên hàm :updateRow
* Chức năng của hàm : hiển thị modal update record
* @param row: record được chọn
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    updateRow(row) {
        const {Id} = row;
        this.recordId = Id;
        const modalUpdate = this.template.querySelector("c-lwc-modal-update-student");
        modalUpdate.show();
    }

/** 
* Tên hàm :handleAddStudent
* Chức năng của hàm : hiển thị modal thêm mới record
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleAddStudent() {
        const modalCreateStudent = this.template.querySelector("c-lwc-modal-create-student");
        modalCreateStudent.show();
    }

/** 
* Tên hàm :handleDeleteAll
* Chức năng của hàm : hiển thị modal delete
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleDeleteAll() {
        const modalDeleteStudent = this.template.querySelector("c-lwc-modal-delete-student");
        modalDeleteStudent.show();
    }

/** 
* Tên hàm :selectedRowHandler
* Chức năng của hàm : thêm các record được chọn vào danh sách checkbox
* @param even:
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    selectedRowHandler(event){
        const selectedRows = event.detail.selectedRows; 
        for ( let i = 0; i < selectedRows.length; i++ ){             
            if ( !this.selectedListId.includes(selectedRows[i].Id)){
                this.selectedListId = [...this.selectedListId, selectedRows[i].Id];
            }
       }
    }

/** 
* Tên hàm :getFirstPage
* Chức năng của hàm : duy chuyển sang trang 1
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    getFirstPage(){
        this.currentPage = 1;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
    }

/** 
* Tên hàm :getPreviousPage
* Chức năng của hàm : duy chuyển sang trang trước đó 
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    getPreviousPage(){
        this.currentPage = this.currentPage - 1;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
    }

/** 
* Tên hàm :getNextPage
* Chức năng của hàm : duy chuyển sang trang trước đó
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    getNextPage(){
        this.currentPage = this.currentPage + 1;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
    }

/** 
* Tên hàm :getLastPage
* Chức năng của hàm : duy chuyển sang trang cuối cùng
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    getLastPage(){
        this.currentPage = this.totalPage ;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
        
    }
  
/** 
* Tên hàm :renderedCallback
* Chức năng của hàm : load css
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    renderedCallback(){ 
        if(this.isCssLoaded) return ;
        this.isCssLoaded = true ;
        loadStyle(this, COLORS).then(() => {
            console.log("Loaded Successfully") ;
        }).catch(error=>{ 
            console.error("Error in loading the colors "+ error) ;
        })
    }

// biến chứa function lấy danh sách học sinh
    getListStudent = function(){
        getListStudent({lastName: this.lastName, isCheck: this.isCheck, idClass:this.value, startDay: this.startDay, endDay:this.endDay, limitRecord:this.LIMIT_RECORD, currentPage:this.currentPage})
        .then(result =>{
            this.listStudent = result;
            this.listStudent = this.listStudent.map(item => {
                let show = item.DiemTB__c < 5 ? "datatable-orange":"";
                return (item.GioiTinh__c == true ? {...item, "showClass":show, GioiTinh__c: 'Nam'} : {...item, "showClass":show, GioiTinh__c: 'Nữ'})
            });
        })
        .catch(err=>{
            this.listStudent= null;
        });
    }

// biến chứa function lấy số lương học sinh theo điều kiện
    getCountStudent = function(){
        getCountStudent({lastName: this.lastName, idClass: this.value, startDay: this.startDay, endDay: this.endDay})
        .then(result =>{
            this.countStudent = result;
            if(this.countStudent !== 0){
                this.flagPagination = true;
                this.totalPage = Math.ceil(this.countStudent / this.LIMIT_RECORD);
                this.updatePagination();
            }
        });
    }

//biến chứa function update phân trang
    updatePagination = function(){
        if(this.currentPage == 1){
            this.isFirstPage = true;
            this.isPreviousPage = true;
        }else{
            this.isFirstPage = false;
            this.isPreviousPage = false; 
        }
        if(this.currentPage == this.totalPage){
            this.isNextPage = true;
            this.isLastPage = true;
        }else{
            this.isNextPage = false;
            this.isLastPage = false;  
        }
    }
}