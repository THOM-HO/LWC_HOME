import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import HoHocSinh from '@salesforce/schema/HocSinh__c.HoHocSinh__c';
import TenHocSinh from '@salesforce/schema/HocSinh__c.TenHocSinh__c';
import Lop from '@salesforce/schema/HocSinh__c.Lop__c';
import NgaySinh from '@salesforce/schema/HocSinh__c.NgaySinh__c';
import GioiTinh from '@salesforce/schema/HocSinh__c.GioiTinh__c';
import Diem1 from '@salesforce/schema/HocSinh__c.Diem1__c';
import Diem2 from '@salesforce/schema/HocSinh__c.Diem2__c';
import Diem3 from '@salesforce/schema/HocSinh__c.Diem3__c';
export default class LwcModalUpdateStudent extends LightningElement {
    //id học sinh được chọn
    @api recordId;
    //object 
    @api objectApiName = 'HocSinh__c';
    //cờ ẩn hiện modal
    showModal = false;
    //các thuộc tính các cột
    fields = [HoHocSinh, TenHocSinh, Lop, NgaySinh, GioiTinh, Diem1, Diem2, Diem3];

/** 
* Tên hàm :handleSuccess
* Chức năng của hàm :xử xí sau khi đối tượng học sinh được chỉnh sửa vào
* @param event: sự kiện
* @return 
* @created: 2022/07/19 Ho Thi Thom
* @modified:    
*/  
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'HocSinh__c update',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
        this.dispatchEvent(new CustomEvent('resetdatatable', {detail : {}}));
        this.showModal = false;
    }

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
}