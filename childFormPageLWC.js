import { LightningElement, track, api } from 'lwc';

export default class ChildFormPageLWC extends LightningElement {
    @track form;
    @api index;
    @track Status;

    @api
    get formData(){
        return this.form;
    }

    set formData(value) {
       this.form = value;
       this.Status = {   Complete : this.form.Status__c === 'Complete',
                        InProgress : this.form.Status__c === 'In Progress',
                        NotStarted : this.form.Status__c === 'New'
                    };


    }

}