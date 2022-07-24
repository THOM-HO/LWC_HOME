import { LightningElement, api } from 'lwc';
import deleteAllStudent from '@salesforce/apex/lwcSearchStudentController.deleteAllStudent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcModalDeleteStudent extends LightningElement {

    // cờ ẩn hiện modal
    showModal = false;
    // ds học sinh bị xóa
    @api listStudentDelete;
    // ds temps học sinh bị xóa
    @api students;

/** 
* Tên hàm :show
* Chức năng của hàm :hiện modal
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/ 
    @api show(){
        this.showModal = true;
    }

/** 
* Tên hàm :handleDialogClose
* Chức năng của hàm :ẩn modal
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/
    handleDialogClose(){
        this.showModal = false;
    }
    
/** 
* Tên hàm :handleDelete
* Chức năng của hàm :xóa danh sách học sinh
* @param 
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/
    handleDelete(){
        this.students = JSON.parse(JSON.stringify(this.listStudentDelete));
        console.log(this.students);
        deleteAllStudent({listDelete:this.students})
        .then(result =>{
            const evt = new ShowToastEvent({
                title: 'HocSinh__c Delete',
                message: 'Delete success !',
                variant: 'success',
            });
            this.dispatchEvent(evt);
            this.dispatchEvent(new CustomEvent('resetdatatable', {detail : {}}));
            this.showModal = false;
        })
        .catch(err=>{
            const evt = new ShowToastEvent({
                title: 'HocSinh__c Delete',
                message: 'ERROR !',
                variant: 'error',
            });
            this.dispatchEvent(evt);
            this.showModal = false;
        });
    }
}