import {
    LightningElement,
    track,
    api
} from 'lwc';
import My_Resource from '@salesforce/resourceUrl/GPO';
import submitGPOAccessDatesRecord from '@salesforce/apex/GPOSiteHomePageController.submitGPOAccessDatesRecord';

export default class GpoAccessDatesListLWC extends LightningElement {

    @track dateLabel = 'Date 1:';
    @api wrapperObj;
    @api gpoaccessdates;
    @api groupid;
    @api currentyear;
    @api metadata;

    @track wrapObjList = [];
    @track meeting1Wrapper = {};
    @track submitrecords = {};
    @track isLoading = false;
    @track isSubmitted = false;
    @track isothershow = false;
    @api finalobjlist = [];
    @track finalArrayList = [];
    ABCLogo = My_Resource;
    @track showError;
    @track isError = false;


    @track isHomePage = false;

    connectedCallback() {

        let objarray = [];

        for (var i = 0; i < 6; i++) {
            let obj = {};
            obj.selectedTime = '';
            obj.reportingPeriod = '';
            obj.dateselected = '';
            obj.othersponsor = '';
            obj.multiValues = '';
            obj.groupid = this.groupid;
            obj.compno = (i + 1).toString();
            obj.firstname = '';
            obj.lastname = '';
            obj.title == '';
            obj.email1 = '';
            obj.phone1 = '';
            obj.altfirstname = '';
            obj.altlastname = '';
            obj.alttitle = '';
            obj.altemail = '';
            obj.altphone = '';
            obj.Physicians = '';
            obj.AdditionalHCP = '';
            obj.Additionalstaff = '';
            obj.ippPracticeAddress = '';
            obj.offSite = '';
            obj.practiceNotes = '';
            obj.selectedCountry = null;
            obj.selectedState = null;
            obj.selectedProjectorSite = null;
            obj.selectedScreenSite = null;

            objarray.push(obj);
        }

        this.finalobjlist = objarray;
        
    }
    // This method is called on click of submit button and save list of gpo lpp access dates record in apex class
    submitRecord() {

        let finalobjlst = JSON.parse(JSON.stringify(this.finalobjlist));
        if (finalobjlst && finalobjlst.length > 0) {

            for (let i = 0; i < finalobjlst.length; i++) {
                finalobjlst[i].reportingPeriod = this.currentyear;
                finalobjlst[i].selectedTime = finalobjlst[i].selectedTime == '--None--' ? '' : finalobjlst[i].selectedTime;
                if (finalobjlst[i].multiValues != '' && finalobjlst[i].multiValues.includes('Other;')) {
                    if (finalobjlst[i].othersponsor == '') {
                        finalobjlst[i].othersponsor = 'Required';
                    } else {
                        var sponsorValue = finalobjlst[i].othersponsor + ';';
                        finalobjlst[i].multiValues = finalobjlst[i].multiValues.replace('Other;', sponsorValue);
                    }

                }

            }
        }
        this.finalobjlist = finalobjlst

        let hasError = this.hasErrorCheck(finalobjlst);

        if (!hasError) {
            this.isLoading = true;
            submitGPOAccessDatesRecord({
                    'wrapperObj': this.finalArrayList,
                    'groupid': this.groupid
                })
                .then(result => {
                    if (result) {
                        this.isLoading = false;
                        this.isSubmitted = true;
                    } else {
                        this.isLoading = false;
                        this.showError = 'Something goes wrong. Please contact your System Administrator';
                        this.isError = true;
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                });

        }
    }
    // This method is used to put validation on page it contain array of values
    hasErrorCheck(arraylist) {
        let decidedArray = [];
        this.isError = false;
        let errormessage;
        var d = new Date();
        var messageNumber = '';
        var requiredCompNo = '1,2,3,4.';
        var requiredalternateCompNo = '';
        console.log('arraylist', JSON.stringify(arraylist));
       
        for (var i = 0; i < arraylist.length; i++) {

            if (arraylist[i].compno != '5' && arraylist[i].compno != '6') {
                if (arraylist[i].dateselected == '' || arraylist[i].selectedTime == '' || arraylist[i].selectedTime == '--None--' || arraylist[i].multiValues == '' ||
                    arraylist[i].firstname == '' || arraylist[i].lastname == '' || arraylist[i].email1 == '' || arraylist[i].phone1 == '' ||
                    arraylist[i].Physicians == '' || arraylist[i].AdditionalHCP == '' || arraylist[i].Additionalstaff == '' || arraylist[i].ippPracticeAddress == '' ||
                    arraylist[i].offSite == '' || arraylist[i].practiceNotes == '' || arraylist[i].selectedCountry == null || arraylist[i].selectedState == null ||
                    arraylist[i].selectedProjectorSite == null || arraylist[i].selectedScreenSite == null || arraylist[i].othersponsor == 'Required') {
                    messageNumber = messageNumber+'1';
                } else {
                    decidedArray.push(arraylist[i]);
                    if (arraylist[i].compno == '1' || arraylist[i].compno == '2' || arraylist[i].compno == '3') {
                        requiredCompNo = requiredCompNo.replace(arraylist[i].compno + ',', '')
                    } else {
                        requiredCompNo = requiredCompNo.replace('4', '')
                    }
                }
            }
            if (arraylist[i].compno == '5' || arraylist[i].compno == '6') {
                if (arraylist[i].dateselected == '' && arraylist[i].selectedTime == '' && arraylist[i].multiValues == '' &&
                    arraylist[i].firstname == '' && arraylist[i].lastname == '' && arraylist[i].email1 == '' && arraylist[i].phone1 == '' &&
                    arraylist[i].Physicians == '' && arraylist[i].AdditionalHCP == '' && arraylist[i].Additionalstaff == '' && arraylist[i].ippPracticeAddress == '' &&
                    arraylist[i].offSite == '' && arraylist[i].practiceNotes == '' && arraylist[i].selectedCountry == null && arraylist[i].selectedState == null &&
                    arraylist[i].selectedProjectorSite == null && arraylist[i].selectedScreenSite == null) {
                   
                } else {
                    if (arraylist[i].dateselected == '' || arraylist[i].selectedTime == '' || arraylist[i].selectedTime == '--None--' || arraylist[i].multiValues == '' ||
                        arraylist[i].firstname == '' || arraylist[i].lastname == '' || arraylist[i].email1 == '' || arraylist[i].phone1 == '' ||
                        arraylist[i].Physicians == '' || arraylist[i].AdditionalHCP == '' || arraylist[i].Additionalstaff == '' || arraylist[i].ippPracticeAddress == '' ||
                        arraylist[i].offSite == '' || arraylist[i].practiceNotes == '' || arraylist[i].selectedCountry == null || arraylist[i].selectedState == null ||
                        arraylist[i].selectedProjectorSite == null || arraylist[i].selectedScreenSite == null || arraylist[i].othersponsor == 'Required') {
                        messageNumber = messageNumber+'3';
                        requiredalternateCompNo = requiredalternateCompNo + ' ' + arraylist[i].compno;

                    } else {
                        decidedArray.push(arraylist[i]);
                    }
                }

            }

            if (arraylist[i].dateselected != '') {
                var dateRec = new Date(arraylist[i].dateselected)

                if (dateRec.getFullYear() != this.currentyear || dateRec < d) {
                    messageNumber = messageNumber+'2';

                }
            }
        }
        this.finalArrayList = decidedArray;
        let metaData = this.metadata;
        requiredCompNo = requiredCompNo.replace(',.', '');
        requiredCompNo = requiredCompNo.replace('.', '');
        requiredalternateCompNo=requiredalternateCompNo.replace('5 6','5,6');
        
        if (messageNumber.includes('1')) {
            errormessage = metaData.Required_section__c.replace('SECTIONNAME', requiredCompNo);
            this.showError = errormessage;
            this.isError = true;
            return errormessage;
        }
        else  if(messageNumber.includes('2')) {
            errormessage = metaData.Current_year_error__c.replace('CURRENTYEAR', this.currentyear);
            this.showError = errormessage;
            this.isError = true;
            return errormessage;
        }
        
        else if(messageNumber.includes('3')) {
            errormessage = metaData.Required_section__c.replace('SECTIONNAME', requiredalternateCompNo);
            this.showError = errormessage;
            this.isError = true;
            return errormessage;
        }
        
       
        return errormessage;
    }
    navigateToDHome() {

        this.isHomePage = true;
    }
    handlecheckbox(event) {
        let objVal = event.detail.finalobjlist;
        this.finalobjlist = objVal;

    }

    handleObjectChange(event) {
        let objListFinal = event.detail.finalobjlist;
        this.finalobjlist = objListFinal;
        for (var i = 0; i < objListFinal.length; i++) {
            if (objListFinal[i].compno == '1') {
                this.meeting1Wrapper = objListFinal[i];
            }
        }

    }



}