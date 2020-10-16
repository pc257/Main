import { LightningElement,api,track } from 'lwc';
import getGPOMembershipRecord from '@salesforce/apex/GPOHierarchyCtrl.getGPOMembershipRecord';
export default class GpoBoxPopover extends LightningElement {
 
  @api ranger;
  @track gpoData;
  @api gponame;
  @track isLoading=false;
  @track showData=false;
  connectedCallback(){
    this.isLoading=true;
    getGPOMembershipRecord({
      'GpoId': this.ranger
  })
  .then(result => {
    this.isLoading=false;
    if(result)
    {
      
      console.log('result'+result);
      var data=JSON.parse(result);
      this.gpoData=data;
      this.showData=true;
    }
  });
  }

  closeModal(){
    const selectedEvent = new CustomEvent("closepopup", {
        detail: {
            ranger:''
        }
    });
    this.dispatchEvent(selectedEvent);
  }
}