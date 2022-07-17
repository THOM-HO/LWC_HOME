import { LightningElement, track, api, wire} from 'lwc';
import getListClass from '@salesforce/apex/lwcSearchStudentController.getListClass';
import getListStudent from '@salesforce/apex/lwcSearchStudentController.getListStudent';

export default class LwcSearchStudent extends LightningElement {
    @api lastName= '';
    @api isCheck = false;
    @api value = '';
    @api startDay = '';
    @api endDay = '' ;

    @track listClass;   
    @track listStudent;   
    @track error; 

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
    @wire(getListStudent,{lastName: '$lastName', isCheck: '$isCheck',IdClass: '$value',startDay: '$startDay', endDay:'$endDay'}) wiredListStudent({ error, data }) {
        if (data) {
            this.listStudent = data;
        } else if (error) { 
           this.error = error;  
        }
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
        getListStudent({lastName: '$lastName', isCheck: '$isCheck',IdClass: '$value',startDay: '$startDay', endDay:'$endDay'})
        .then(result =>{
            this.listStudent = result ;
            console.log(result);
        })
        .catch(err=>{
            this.listStudent= null;
        });
    }

    handleAddStudent(event) {
        
    }
    handleDeleteAll(event) {
        
    }

}