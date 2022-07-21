import { LightningElement, api } from 'lwc';
import HoHocSinh from '@salesforce/schema/HocSinh__c.HoHocSinh__c';
import TenHocSinh from '@salesforce/schema/HocSinh__c.TenHocSinh__c';
import NgaySinh from '@salesforce/schema/HocSinh__c.NgaySinh__c';
import GioiTinh from '@salesforce/schema/HocSinh__c.GioiTinh__c';
import Diem1 from '@salesforce/schema/HocSinh__c.Diem1__c';
import Diem2 from '@salesforce/schema/HocSinh__c.Diem2__c';
import Diem3 from '@salesforce/schema/HocSinh__c.Diem3__c';
import DiemTB from '@salesforce/schema/HocSinh__c.DiemTB__c';
import TinhTrang from '@salesforce/schema/HocSinh__c.TinhTrang__c';
export default class LwcModalViewStudent extends LightningElement {
    @api recordId;
    @api obj = 'HocSinh__c';

    showModal = false;
    fields = [HoHocSinh, TenHocSinh, NgaySinh, GioiTinh, Diem1, Diem2, Diem3, DiemTB, TinhTrang];
    @api show(){
        this.showModal = true;
    }

    handleDialogClose(){
        this.showModal = false;
    }
}