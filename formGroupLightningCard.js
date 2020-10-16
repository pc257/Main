import { LightningElement, track } from 'lwc';
import getFormGroup from '@salesforce/apex/FormGroup.getFormGroup';
import { NavigationMixin } from 'lightning/navigation';
import CommunityName from '@salesforce/label/c.CommunityName';
export default class FormGroupLightningCard extends NavigationMixin(LightningElement) {
    @track Forms;
    @track error;
    @track recordPageUrl;

 navigateToRecord(event) {
    var URL = window.location.origin + CommunityName + 's/form/' + event.target.value;
    window.parent.location.href = URL;
     this[NavigationMixin.Navigate]({
         
            type: 'comm__namedPage',
            attributes: {
                pageName: URL,
            },
    });
 }

    connectedCallback(){
        getFormGroup().then(result => {
            this.Forms  = result; 
        })
        .catch(error => {
            this.error = error;
        });
    }

   /* @wire(getFormGroup)
    wiredForms({error, data}) {
        // initialize component
        if (data) {
            this.Forms = data;
            this.error = undefined;
        } else if(error){
            this.error = error;
            this.Forms = undefined;
        }
    }*/
}