import { LightningElement, api, wire, track } from 'lwc';
import showForms from '@salesforce/apex/FormGroup.showForms';

export default class FormPageLWC extends LightningElement {
    @api recordId;
    @track error;
    @track FormGroupName;
    @track FormGroupDescription;

    @wire(showForms, {GroupFrmName: '$recordId'}) forms;

    renderedCallback() {
        this.FormGroupName = this.forms.data[0].Onboarding_Form_Group__r.Name;
        this.FormGroupDescription = this.forms.data[0].Onboarding_Form_Group__r.Description__c;
    }

}