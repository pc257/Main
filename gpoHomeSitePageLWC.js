import {
  LightningElement,
  track,
  api
} from 'lwc';
import My_Resource from '@salesforce/resourceUrl/GPO';
import getGroupIdDetails from '@salesforce/apex/GPOSiteHomePageController.getGroupMemberDetails';
import getCustomMetadata from '@salesforce/apex/GPOSiteHomePageController.getCustomMetadata';
export default class GpoHomeSitePageLWC extends LightningElement {

  ABCLogo = My_Resource;
  @track showError;
  @api isdetailpage = false;
  @track isError = false;
  @track groupid;
  @track membershipid;
  @track gpoaccessdates;
  @track isLoading = false;
  @track homeLabel;
  @track existingRecError = false;
  @track startDate;
  @track currentyear;
  @track groupIdExist;
  @track invalidGroupId;
  @track metaData;
  connectedCallback()
  {
    this.isLoading = true;
    getCustomMetadata()
    .then(result => {
        if(result)
        {
            this.metaData=result;
            
            this.homeLabel=result.Home_Label__c;
            this.existingRecError=result.Existing_Records_Error__c;
            this.groupIdExist=result.GroupId_Not_exist__c;
            this.invalidGroupId=result.Invalid_GroupId__c;
            let todaysdate=new Date();
            var year = todaysdate.getFullYear();
            let startingDte=new Date(result.Year_Start_Date__c);
            let monthInedex=startingDte.getMonth();
            let dayIndex=startingDte.getDay();
            if(dayIndex==0)
            {
                dayIndex=1;  
            }
           
            this.startDate=new Date(year,monthInedex,dayIndex);
            var compareDate=this.startDate;
            var year = todaysdate.getFullYear();
           
            if(todaysdate>=compareDate)
            {
                year=year+1;
            }
            this.currentyear=year;
            this.isLoading = false;
         }
         else{
            this.isLoading = false;
         }
  });
  
  }
 

  navigateToDetail(evt) {
      if (this.groupid) {
          this.isError = false;
          this.isLoading = true;
          getGroupIdDetails({
                  'groupId': this.groupid
              })
              .then(result => {
                  if (result) {
                      let resultObj = JSON.parse(result);
                      let gpoMemList = resultObj.gpoMemList;
                      let  activeGpoMember= resultObj.activeGpoMember;
                      console.log('resultObj'+JSON.stringify(resultObj));
                      if(gpoMemList && gpoMemList.length>0 && activeGpoMember){
                      let gpoAccessdatesList = resultObj.gpoAccessdatesList;
                      console.log('gpoAccessdatesList'+JSON.stringify(gpoAccessdatesList));
                      if(gpoAccessdatesList && gpoAccessdatesList.length>0)
                      {
                        let year=this.currentyear;
                        console.log('year'+year);
                        for (var i = 0; i < gpoAccessdatesList.length; i++) {
                         
                            if (gpoAccessdatesList[i].Report_Period__c == year) {
                                this.isLoading = false;
                                this.isError = true;
                                let msg=this.existingRecError;
                                msg=msg.replace("CURRENTYEAR", year);
                                this.showError = msg;
                
                            }
                        }

                      }
                      if(!this.isError)
                      {
                      this.gpoaccessdates = gpoAccessdatesList;
                      this.isLoading = false;
                    
                          this.isdetailpage = true;
                          this.membershipid = activeGpoMember.Id;
                       }
                    }
                    else
                    {
                        if (gpoMemList && gpoMemList.length > 0) {
                            this.isLoading = false;
                            this.isError = true;
                            this.showError = this.invalidGroupId;
                        }
                        else{
                            this.isLoading = false;
                            this.showErrorMessage();
                        }
                    }
                      
                  }
                  else{
                    this.isLoading = false;
                    this.showErrorMessage();
                  }

              })
              .catch(error => {
                  this.isLoading = false;
                  this.isError = true;
                  this.showError = error;
              });

      } else {
          this.isLoading = false;
          this.isError = true;
        this.showError =' Group Id should be entered before clicking submit. Please enter a valid Group Id.';
      }
  }
  inputChange(event) {
      this.groupid = event.target.value;

  }
  showErrorMessage() {
      this.isError = true;
      this.showError = this.groupIdExist;
  }


}