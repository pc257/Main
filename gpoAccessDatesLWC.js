import {
    LightningElement,
    track,
    wire,
    api
} from 'lwc';
import {
    getPicklistValuesByRecordType
} from 'lightning/uiObjectInfoApi';
import {
    getObjectInfo
} from 'lightning/uiObjectInfoApi';
import AccessDates_OBJECT from '@salesforce/schema/GPO_LPP_Access_Date__c';

export default class GpoAccessDatesLWC extends LightningElement {
    @track isModalOpen = false;
    @api wrapperObj;
    @api meetingwrapper;
    @api finalobjlist;
    @api compno;
    @api datelabel;
    @api timelabel;
    @track selectedTime;
    @track showCheckbox = true;
    @track dateselected;
    @track othersponsor = false;
    @track othersponsorval;
    @track timelabel;
    @track ischecked;
  

    @track multivalues;
    @track timeOptions = [];
    @track msOptions = [];
    @track selectedFieldsObj = {};
    @track checkValueChanges;
    @track _mOptions;
    @wire(getObjectInfo, {
        objectApiName: AccessDates_OBJECT
    })
    objectInfo;

    @wire(getPicklistValuesByRecordType, {
        objectApiName: AccessDates_OBJECT,
        recordTypeId: '$objectInfo.data.defaultRecordTypeId'
    })
    countryPicklistValues({
        error,
        data
    }) {
        if (data) {
            this.error = null;
            let timeSiteOptions = [{
                label: '--None--',
                value: '--None--'
            }];
            data.picklistFieldValues.Access_Time__c.values.forEach(key => {
                timeSiteOptions.push({
                    label: key.label,
                    value: key.value
                })
            });
            this.timeOptions = timeSiteOptions;

            let screenSiteOptions = [];
            let keyVal = 1;
            data.picklistFieldValues.Practice_Preferred_Pharma_Sponsor__c.values.forEach(key => {
                screenSiteOptions.push({
                    key: keyVal,
                    value: key.value
                })
                keyVal++;
            });
            this.msOptions = screenSiteOptions;

            console.log('screenSiteOptions', JSON.stringify(screenSiteOptions))

        } else if (error) {
            this.error = JSON.stringify(error);
        }
    }



    connectedCallback() {
        this.selectedTime = '';
        this.dateselected = '';
        this.othersponsorval = '';
        this.multivalues = '';
        if (this.compno == '1') {
            this.showCheckbox = false;
        }
       
    }
   
    handleProgressValueChange(event) {
        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
        let wrapObj = event.detail.wrapperObj;
        this.isModalOpen = event.detail.isModalOpen;
       
        for (let i = 0; i < finalobjlst.length; i++) {
            if (this.compno == finalobjlst[i].compno) {
                
                finalobjlst[i].selectedTime = this.selectedTime;
                finalobjlst[i].dateselected = this.dateselected;
                finalobjlst[i].othersponsor = this.othersponsorval;
                finalobjlst[i].multiValues = this.multivalues;
                if (wrapObj) {

                    finalobjlst[i].firstname = wrapObj.firstname;
                    finalobjlst[i].lastname = wrapObj.lastname;
                    finalobjlst[i].title = wrapObj.title;
                    finalobjlst[i].email1 = wrapObj.email1;
                    finalobjlst[i].phone1 = wrapObj.phone1;
                    finalobjlst[i].altfirstname = wrapObj.altfirstname;
                    finalobjlst[i].altlastname = wrapObj.altlastname;
                    finalobjlst[i].alttitle = wrapObj.alttitle;
                    finalobjlst[i].altemail = wrapObj.altemail;
                    finalobjlst[i].altphone = wrapObj.altphone;
                    finalobjlst[i].Physicians = wrapObj.Physicians;
                    finalobjlst[i].AdditionalHCP = wrapObj.AdditionalHCP;
                    finalobjlst[i].Additionalstaff = wrapObj.Additionalstaff;
                    finalobjlst[i].ippPracticeAddress = wrapObj.ippPracticeAddress;
                    finalobjlst[i].offSite = wrapObj.offSite;
                    finalobjlst[i].practiceNotes = wrapObj.practiceNotes;
                    finalobjlst[i].selectedCountry = wrapObj.selectedCountry;
                    finalobjlst[i].selectedState = wrapObj.selectedState;
                    finalobjlst[i].selectedProjectorSite = wrapObj.selectedProjectorSite;
                    finalobjlst[i].selectedScreenSite = wrapObj.selectedScreenSite;
                }

            }

        }

        this.finalobjlist = finalobjlst;

        const selectedEvent = new CustomEvent("pushdatatoparent", {
            detail: {
                finalobjlist: this.finalobjlist
            }
        });
        this.dispatchEvent(selectedEvent);


    }
    openModal(event) {
        this.isModalOpen = true;

    }
    copyMeetingChange(event) {
        let checkedValue = event.target.checked;
        this.ischecked = checkedValue;
        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
        if (checkedValue) {

            let wrapObj = this.meetingwrapper;

           
            for (let i = 0; i < finalobjlst.length; i++) {
                if (this.compno == finalobjlst[i].compno) {
                    

                    if (wrapObj) {

                        finalobjlst[i].firstname = wrapObj.firstname;
                        finalobjlst[i].lastname = wrapObj.lastname;
                        finalobjlst[i].title = wrapObj.title;
                        finalobjlst[i].email1 = wrapObj.email1;
                        finalobjlst[i].phone1 = wrapObj.phone1;
                        finalobjlst[i].altfirstname = wrapObj.altfirstname;
                        finalobjlst[i].altlastname = wrapObj.altlastname;
                        finalobjlst[i].alttitle = wrapObj.alttitle;
                        finalobjlst[i].altemail = wrapObj.altemail;
                        finalobjlst[i].altphone = wrapObj.altphone;
                        finalobjlst[i].Physicians = wrapObj.Physicians;
                        finalobjlst[i].AdditionalHCP = wrapObj.AdditionalHCP;
                        finalobjlst[i].Additionalstaff = wrapObj.Additionalstaff;
                        finalobjlst[i].ippPracticeAddress = wrapObj.ippPracticeAddress;
                        finalobjlst[i].offSite = wrapObj.offSite;
                        finalobjlst[i].practiceNotes = wrapObj.practiceNotes;
                        finalobjlst[i].selectedCountry = wrapObj.selectedCountry;
                        finalobjlst[i].selectedState = wrapObj.selectedState;
                        finalobjlst[i].selectedProjectorSite = wrapObj.selectedProjectorSite;
                        finalobjlst[i].selectedScreenSite = wrapObj.selectedScreenSite;
                        this.checkValueChanges = finalobjlst[i];
                    }

                }

            }



        } else {
            for (let i = 0; i < finalobjlst.length; i++) {
                if (this.compno == finalobjlst[i].compno) {
                    finalobjlst[i].firstname = '';
                    finalobjlst[i].lastname = '';
                    finalobjlst[i].title = '';
                    finalobjlst[i].email1 = '';
                    finalobjlst[i].phone1 = '';
                    finalobjlst[i].altfirstname = '';
                    finalobjlst[i].altlastname = '';
                    finalobjlst[i].alttitle = '';
                    finalobjlst[i].altemail = '';
                    finalobjlst[i].altphone = '';
                    finalobjlst[i].Physicians = '';
                    finalobjlst[i].AdditionalHCP = '';
                    finalobjlst[i].Additionalstaff = '';
                    finalobjlst[i].ippPracticeAddress = '';
                    finalobjlst[i].offSite = '';
                    finalobjlst[i].practiceNotes = '';
                    finalobjlst[i].selectedCountry = null;
                    finalobjlst[i].selectedState = null;
                    finalobjlst[i].selectedProjectorSite = null;
                    finalobjlst[i].selectedScreenSite = null;

                }

            }
            

        }
        const selectedEvent = new CustomEvent("checkboxcheck", {
            detail: {
                finalobjlist: finalobjlst
            }
        });
        this.dispatchEvent(selectedEvent);
    }
    dateselectedChange(event) {
        this.dateselected = event.target.value;
        if(!event.target.value)
        {
            this.dateselected='';  
        }
        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
        
        if (finalobjlst && finalobjlst.length > 0) {
            for (let i = 0; i < finalobjlst.length; i++) {
                if (this.compno == finalobjlst[i].compno) {
                    
                    finalobjlst[i].dateselected = this.dateselected;
                }

            }
        }
        
        const selectedEvent = new CustomEvent("checkboxcheck", {
            detail: {
                finalobjlist: finalobjlst
            }
        });
        this.dispatchEvent(selectedEvent);

    }

    handleTimeChange(event) {
        this.selectedTime = event.target.value;
        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
       
        if (finalobjlst && finalobjlst.length > 0) {
            for (let i = 0; i < finalobjlst.length; i++) {
                if (this.compno == finalobjlst[i].compno) {
                   
                    finalobjlst[i].selectedTime = this.selectedTime;
                }

            }
        }
      
        const selectedEvent = new CustomEvent("checkboxcheck", {
            detail: {
                finalobjlist: finalobjlst
            }
        });
        this.dispatchEvent(selectedEvent);

    }
    othersponsorChange(event) {
        this.othersponsorval = event.target.value;


        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
        
        if (finalobjlst && finalobjlst.length > 0) {
            for (let i = 0; i < finalobjlst.length; i++) {
                if (this.compno == finalobjlst[i].compno) {
                    
                    finalobjlst[i].othersponsor = this.othersponsorval;

                }

            }
        }
       
        const selectedEvent = new CustomEvent("checkboxcheck", {
            detail: {
                finalobjlist: finalobjlst
            }
        });
        this.dispatchEvent(selectedEvent);

    }
    handleOnItemSelected(event) {
        let selectedVal = event.detail;
        this._mOptions=selectedVal;
        let mulValues = '';
        let sponsorship = false;
        for (let index = 0; index < selectedVal.length; index++) {
            if (selectedVal[index].value == 'Other') {
                sponsorship = true;
            }
            mulValues = mulValues + selectedVal[index].value + ';';
        }
        this.multivalues = mulValues;
        if(!sponsorship)
        {
            this.othersponsorval=''; 
        }
        this.othersponsor = sponsorship;
        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
        
        if (finalobjlst && finalobjlst.length > 0) {
            for (let i = 0; i < finalobjlst.length; i++) {
                if (this.compno == finalobjlst[i].compno) {
                     finalobjlst[i].multiValues = this.multivalues;
                }

            }
        }
     
        const selectedEvent = new CustomEvent("checkboxcheck", {
            detail: {
                finalobjlist: finalobjlst
            }
        });
        this.dispatchEvent(selectedEvent);

    }
}