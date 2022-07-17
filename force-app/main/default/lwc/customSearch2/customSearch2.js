import { LightningElement,track, wire, api } from 'lwc';
import getAccounts from '@salesforce/apex/SearchLWCController.getAccounts';
export default class CustomSearch extends LightningElement {
    @api key;
    @track accounts;

    updateKey(event){
        this.key = event.target.value;
        // alert(JSON.stringify(this.accounts));
    }
    @wire(getAccounts, {searchKey: '$key'})
    accounts;
    
    cols= [
        {label:'Account Name' , fieldName:'Name' , type:'text'},
        {label:'Phone' , fieldName:'Phone' , type:'phone'},
        {label:'Industry' , fieldName:'Industry' , type:'text'},
        {label:'Website' , fieldName:'Website' , type:'text'},

    ]       
}