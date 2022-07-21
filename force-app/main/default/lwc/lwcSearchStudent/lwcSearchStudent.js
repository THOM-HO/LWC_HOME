import { LightningElement, api, wire} from 'lwc';
import getListClass from '@salesforce/apex/lwcSearchStudentController.getListClass';
import getListStudent from '@salesforce/apex/lwcSearchStudentController.getListStudent';
import getCountStudent from '@salesforce/apex/lwcSearchStudentController.getCountStudent';
import {loadStyle} from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
    { label: 'Update', name: 'update' },
];

const cols = [
    {label : 'Họ', fieldName : 'HoHocSinh__c', type : 'text',"cellAttributes" : { "class" : { "fieldName" : "showClass" }}},
    {label : 'Tên', fieldName : 'TenHocSinh__c', type : 'text', "cellAttributes" : {"class" : { "fieldName" : "showClass" }}},
    {label : 'Giới tính', fieldName : 'GioiTinh__c', type : 'text' , "cellAttributes" : {"class" : {"fieldName": "showClass" }}},
    {label : 'Ngày Sinh', fieldName : 'NgaySinh__c', type : 'date', "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm 1', fieldName : 'Diem1__c', type : 'Number' , "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm 2', fieldName : 'Diem2__c', type : 'Number', "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm 3', fieldName : 'Diem3__c', type : 'Number' , "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Điểm TB', fieldName : 'DiemTB__c', type : 'Number' , "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {label : 'Tình trạng', fieldName : 'TinhTrang__c', type : 'text', "cellAttributes" : {"class" : {"fieldName" : "showClass" }}},
    {type : 'action', typeAttributes : { rowActions: actions } , "cellAttributes" : { "class": {"fieldName": "showClass" }}}
]

export default class LwcSearchStudent extends LightningElement {
    @api lastName= '';
    @api isCheck = false;
    @api value = '';
    @api startDay ='';
    @api endDay = '';

    @api listClass;   
    @api listStudent;   
    @api error;

    @api countStudent = 0;
    @api currentPage = 1;
    @api LIMIT_RECORD = 5;
    @api totalPage = 0;
    @api flagPagination = false;

    @api isFirstPage = false;
    @api isPreviousPage = false;
    @api isNextPage = false;
    @api isLastPage = false;

    @api recordId ;
    @api selectedListId = [];
    
    cols = cols;
    isCssLoaded = false

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
    connectedCallback(){
        this.getListStudent();
        this.getCountStudent();
    }

    handleChangeClass(event) {
        this.value = event.detail.value;
    }

    handleChangeText(event) {
        this.lastName = event.target.value;
    }

    handleChangeCheckBox(event) {
        this.isCheck = event.target.checked;
    }

    handleChangeStartDay(event){
        this.startDay = event.target.value;
    }

    handleChangeEndDay(event){
        this.endDay = event.target.value;
    }

    handleSearch(event) {
        this.flagPagination = false;
        this.currentPage = 1;
        this.getListStudent();
        this.getCountStudent();
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                break;
            case 'update':
                this.updateRow(row);
                break;
            default:
        }
    }

    deleteRow(row) {
        const {Id} = row;
        this.selectedListId = [Id]
        const modalDeleteStudent = this.template.querySelector("c-lwc-modal-delete-student");
        modalDeleteStudent.show();
    }

    showRowDetails(row) {
        const {Id} = row;
        this.recordId = Id;
        const modalView = this.template.querySelector("c-lwc-modal-view-student");
        modalView.show();
    }

    updateRow(row) {
        const {Id} = row;
        this.recordId = Id;
        const modalUpdate = this.template.querySelector("c-lwc-modal-update-student");
        modalUpdate.show();
    }

    handleAddStudent(event) {
        const modalCreateStudent = this.template.querySelector("c-lwc-modal-create-student");
        modalCreateStudent.show();
    }
    handleDeleteAll(event) {
        const modalDeleteStudent = this.template.querySelector("c-lwc-modal-delete-student");
        modalDeleteStudent.show();
    }
    selectedRowHandler(event){
        const selectedRows = event.detail.selectedRows; 
        for ( let i = 0; i < selectedRows.length; i++ ){             
            if ( !this.selectedListId.includes(selectedRows[i].Id)){
                this.selectedListId = [...this.selectedListId, selectedRows[i].Id];
            }
       }
    }

    getFirstPage(){
        this.currentPage = 1;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
    }

    getPreviousPage(){
        this.currentPage = this.currentPage - 1;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
    }

    getNextPage(){
        this.currentPage = this.currentPage + 1;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
    }

    getLastPage(){
        this.currentPage = this.totalPage ;
        console.log(this.currentPage);
        this.updatePagination();
        this.getListStudent();
        
    }
    
    renderedCallback(){ 
        if(this.isCssLoaded) return ;
        this.isCssLoaded = true ;
        loadStyle(this, COLORS).then(() => {
            console.log("Loaded Successfully") ;
        }).catch(error=>{ 
            console.error("Error in loading the colors "+ error) ;
        })
    }

    getListStudent = function(){
        getListStudent({lastName: this.lastName, isCheck: this.isCheck, idClass:this.value, startDay: this.startDay, endDay:this.endDay, limitRecord:this.LIMIT_RECORD, currentPage:this.currentPage})
        .then(result =>{
            this.listStudent = result;
            this.listStudent = this.listStudent.map(item => {
                let show = item.DiemTB__c < 5 ? "datatable-orange":"";
                return (item.GioiTinh__c == true ? {...item, "showClass":show, GioiTinh__c: 'Nam'} : {...item, "showClass":show, GioiTinh__c: 'Nữ'})
            });
            // console.log(JSON.stringify(this.listStudent));
        })
        .catch(err=>{
            this.listStudent= null;
        });
    }
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