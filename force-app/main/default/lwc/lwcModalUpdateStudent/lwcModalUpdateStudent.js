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
    @api recordId;
    @api objectApiName = 'HocSinh__c';
    showModal = false;
    fields = [HoHocSinh, TenHocSinh, Lop, NgaySinh, GioiTinh, Diem1, Diem2, Diem3];
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'HocSinh__c update',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    @api show(){
        this.showModal = true;
    }

    handleDialogClose(){
        this.showModal = false;
    }
}