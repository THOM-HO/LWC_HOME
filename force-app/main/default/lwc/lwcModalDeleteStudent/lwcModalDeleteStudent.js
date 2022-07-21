import { LightningElement, api } from 'lwc';
import deleteAllStudent from '@salesforce/apex/lwcSearchStudentController.deleteAllStudent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcModalDeleteStudent extends LightningElement {

    showModal = false;
    @api listStudentDelete;
    @api students;
    @api show(){
        this.showModal = true;
    }

    handleDialogClose(){
        this.showModal = false;
    }
    
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