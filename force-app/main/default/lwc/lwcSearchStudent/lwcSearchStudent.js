import { LightningElement, api, wire} from 'lwc';
import getListClass from '@salesforce/apex/lwcSearchStudentController.getListClass';
import getListStudent from '@salesforce/apex/lwcSearchStudentController.getListStudent';

export default class LwcSearchStudent extends LightningElement {
    @api lastName= '';
    @api isCheck = false;
    @api value = '';
    @api startDay = '';
    @api endDay = '' ;

    @api listClass;   
    @api listStudent;   
    @api error;
    
    cols= [
        {label:'Họ' , fieldName:'HoHocSinh__c' , type:'text'},
        {label:'Tên' , fieldName:'TenHocSinh__c' , type:'text'},
        {label:'Giới tính' , fieldName:'GioiTinh__c' , type:'text'},
        {label:'Ngày sinh' , fieldName:'NgaySinh__c' , type:'text'},
        {label:'Điểm 1' , fieldName:'Diem1__c' , type:'text'},
        {label:'Điểm 2' , fieldName:'Diem2__c' , type:'text'},
        {label:'Điểm 3' , fieldName:'Diem3__c' , type:'text'},
        {label:'Điểm TB' , fieldName:'DiemTB__c' , type:'text'},
        {label:'Tình trạng' , fieldName:'TinhTrang__c' , type:'text'},

    ] 

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
            this.listStudent = this.listStudent.map(item => {
                return (item.GioiTinh__c == true ? {...item, GioiTinh__c: 'Nam'} : {...item, GioiTinh__c: 'Nữ'})
            });
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
            console.log(JSON.stringify(result));
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