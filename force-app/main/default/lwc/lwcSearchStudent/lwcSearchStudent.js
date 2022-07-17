import { LightningElement } from 'lwc';

export default class LwcSearchStudent extends LightningElement {
    // value = [];
    // get options() {
    //     return [
    //         { label: 'Sắp xếp theo tên tăng dần ', value: '1' },
    //     ];
    // }

    // handleChange(e) {
    //     this.value = e.detail.value;
    // }

    value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}