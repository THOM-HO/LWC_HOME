import { LightningElement, api } from 'lwc';

export default class ParentComponent extends LightningElement {
    @api firstName = 'Hồ';
    @api lastName = 'Thơm';
}