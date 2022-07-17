import { LightningElement,api } from 'lwc';

export default class ChildComponnet extends LightningElement {
    @api firstname;
    @api lastname;
}