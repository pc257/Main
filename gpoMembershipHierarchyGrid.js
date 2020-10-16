import {
    LightningElement,
    track,
    api
} from 'lwc';
import getGroupIdDetails from '@salesforce/apex/GPOHierarchyCtrl.getGroupMemberDetails';
export default class GpoMembershipHierarchyGrid extends LightningElement {
 @api recordId;
 @track gridGranddata;
 @track gridExpandedRows;
 @track selectedRows;
 @track ranger;
 @track gponame;
 @track isLoading=false;
 @track isopenModal=false;

 connectedCallback()
 {
     this.isLoading=true;
     console.log('recordId',this.recordId);
    
    getGroupIdDetails({
        'recordId': this.recordId
    })
    .then(result => {
        if(result)
        {
            console.log('result'+result);
            var resultObj=JSON.parse(result);
            var obj=resultObj.GPOMap;
            var grandObj,parentObj,ChidObj;
            for(var key in obj)
            {
                if(key==resultObj.GrandParentGPOId)
                {
                    grandObj=obj[key];
               }
              if(key==resultObj.ParentGPOId)
                {
                    parentObj=obj[key];
                 }
                if(key==this.recordId)
                {
                    ChidObj=obj[key];
                }
            }
            var griddata=[];
            var gridExpand=[];
            var selectedRec=[];
            var devidedString=window.location.href.split('GPO_Membership__c');
            var urlString=devidedString[0]+'GPO_Membership__c/';
          
            if(grandObj){
             
               var parentArray=grandObj.parentMemberList;
               var GrandMemberList=grandObj.GrandMemberList;
               var objnewGrand=this.createChildList(grandObj,urlString);
               gridExpand.push(grandObj.Name);
               if(parentArray && parentArray.length>0)
               {
                   var arraylist=[];
                  // var parentString=JSON.stringify(parentArray);
                   for(var i=0;i<parentArray.length;i++)
                   {
                  var  objnewParent=this.createChildList(parentArray[i],urlString);
                   gridExpand.push(parentArray[i].Name);
                   console.log('parentArray[i].Id'+parentArray[i].Id);
                    var childArrayList=[];
                    for(var key in obj)
                    {
                   if(key==parentArray[i].Id)
                  {
                    
                    var childparentArray=obj[key].parentMemberList;
                    if(childparentArray && childparentArray.length>0)
                    {
                    for(var k=0;k<childparentArray.length;k++)
                    {
                        
                        var objnewCurrent=this.createChildList(childparentArray[k],urlString);
                        gridExpand.push(childparentArray[k].Name);
                        if(childparentArray[k].Id==this.recordId)
                        {
                            selectedRec.push(childparentArray[k].Name);
                        }
                        childArrayList.push(objnewCurrent);
                        
                    }
                }
                }
                }
                    objnewParent._children=childArrayList;
                
                    arraylist.push(objnewParent);
                   }
                  
                   objnewGrand._children=arraylist;
               }
               else
               {
                if(parentObj)
                {
                    var arraylist=[];
                    var objnewParent=this.createChildList(parentObj,urlString);
                    gridExpand.push(parentObj.Name);
                    var parentArray=parentObj.parentMemberList;  
                    var childArrayList=[];
                    for(var i=0;i<parentArray.length;i++)
                    {
                     
                    var objnew=this.createChildList(parentArray[i],urlString);
                    gridExpand.push(parentArray[i].Name);
                    var childParentArrayList=[];
                    for(var key in obj)
                    {
                      if(key==parentArray[i].Id)
                        {
                          var childparentArray=obj[key].parentMemberList;
                           if(childparentArray && childparentArray.length>0)
                             {
                                   for(var k=0;k<childparentArray.length;k++)
                                   {
                                       
                                       var objnewCurrent=this.createChildList(childparentArray[k],urlString);
                                       gridExpand.push(childparentArray[k].Name);
                                       if(childparentArray[k].Id==this.recordId)
                                       {
                                           selectedRec.push(childparentArray[k].Name);
                                       }
                                      childParentArrayList.push(objnewCurrent);
                                       
                                   }
                               }
                           }
                      }
                    objnew._children=childParentArrayList;
                    childArrayList.push(objnew);
                    
                
                    }
                    objnewParent._children=childArrayList;
                    arraylist.push(objnewParent);
                    objnewGrand._children=arraylist;
                }
                else if(GrandMemberList && GrandMemberList.length>0) {
                    var childArrayList=[];
                    for(var i=0;i<GrandMemberList.length;i++)
                    {
                        
                        var objGrand=this.createChildList(GrandMemberList[i],urlString);
                        gridExpand.push(GrandMemberList[i].Name);
                        childArrayList.push(objGrand);
                        
                    }
                    objnewGrand._children=childArrayList;
                }  
               }
               griddata.push(objnewGrand);
               this.gridGranddata=griddata;
               
            }
            else if(parentObj)
            {
                var arraylist=[];
                var parentArray=parentObj.parentMemberList;  
                var objnewParent=this.createChildList(parentObj,urlString);
                gridExpand.push(parentObj.Name);
                var childArrayList=[];
                for(var i=0;i<parentArray.length;i++)
                {
                   
                    var objnew=this.createChildList(parentArray[i],urlString);
                    gridExpand.push(parentArray[i].Name);
                    if(parentArray[i].Id==this.recordId)
                    {
                        selectedRec.push(parentArray[i].Name);
                    }
                    var childParentArrayList=[];
                    for(var key in obj)
                    {
                      if(key==parentArray[i].Id)
                        {
                          var childparentArray=obj[key].parentMemberList;
                           if(childparentArray && childparentArray.length>0)
                             {
                                   for(var k=0;k<childparentArray.length;k++)
                                   {
                                       
                                       var objnewCurrent=this.createChildList(childparentArray[k],urlString);
                                       gridExpand.push(childparentArray[k].Name);
                                      
                                      childParentArrayList.push(objnewCurrent);
                                       
                                   }
                               }
                           }
                      }
                    objnew._children=childParentArrayList;
                    childArrayList.push(objnew);
                    
                }
                objnewParent._children=childArrayList;
                arraylist.push(objnewParent);
                this.gridGranddata=arraylist;
               
            }
            else if(ChidObj)
            {
                    var arraylist=[];
                    var objnewParent=this.createChildList(ChidObj,urlString);
                    gridExpand.push(ChidObj.Name);
                    if(ChidObj.Id==this.recordId)
                    {
                        selectedRec.push(ChidObj.Name);
                    }
                    var parentArray=ChidObj.parentMemberList;  
                    var childArrayList=[];
                    for(var i=0;i<parentArray.length;i++)
                    {
                     
                    var objnew=this.createChildList(parentArray[i],urlString);
                    gridExpand.push(parentArray[i].Name);
                    var childParentArrayList=[];
                    for(var key in obj)
                    {
                      if(key==parentArray[i].Id)
                        {
                          var childparentArray=obj[key].parentMemberList;
                           if(childparentArray && childparentArray.length>0)
                             {
                                   for(var k=0;k<childparentArray.length;k++)
                                   {
                                       
                                       var objnewCurrent=this.createChildList(childparentArray[k],urlString);
                                       gridExpand.push(childparentArray[k].Name);
                                      childParentArrayList.push(objnewCurrent);
                                       
                                   }
                               }
                           }
                      }
                    objnew._children=childParentArrayList;
                    childArrayList.push(objnew);
                    
                
                    }
                    objnewParent._children=childArrayList;
                    arraylist.push(objnewParent);
                    this.gridGranddata=arraylist;
               
            }
            this.gridExpandedRows=gridExpand;
            this.selectedRows=selectedRec;
            this.isLoading=false;
        }
        else{
            this.isLoading=false;
        }
    });

 }
 createChildList(ChidObj,urlString)
 {
    var objnewCurrent={Name:'',Account_Name__c:'', Account_Number__c:'', GPO__c:'',Membership_Status__c:'',urlObjString:'',Id:'',GpoAddress:'', _children:[]} 
    objnewCurrent.urlObjString=urlString+ChidObj.Id+'/view';
    objnewCurrent.Name=ChidObj.Name;
    objnewCurrent.Id=ChidObj.Id;
    objnewCurrent.Account_Name__c=ChidObj.Account_Name;
    objnewCurrent.Account_Number__c=ChidObj.Account_Number;
    objnewCurrent.GPO__c=ChidObj.GPO;
    objnewCurrent.GpoAddress=ChidObj.GpoAddress;
    objnewCurrent.Membership_Status__c=ChidObj.Membership_Status;
    
    return objnewCurrent;
 }
 closemodal(event){
    this.ranger = event.detail.ranger;
    this.isopenModal=false;
 }
 handleOnselect(event){
    
    this.isopenModal=true;
    var obj=event.detail.row;
    console.log('event',JSON.stringify(event.detail.row));
    this.ranger=obj.Id;
    this.gponame=obj.Name;
 
 }
 
gridColumns=[
    {
        type:'url',
        fieldName:'urlObjString',
        label:'Name',
        typeAttributes: { label: { fieldName: 'Name'}, target:'_blank'},
        initialWidth: 150
    },
    {
        type:'String',
        fieldName:'Account_Name__c',
        label:'Account Name'
    },
    {
        type:'String',
        fieldName:'Account_Number__c',
        label:'Account Number'
    },
    {
        type:'String',
        fieldName:'GPO__c',
        label:'GPO'
    },
    {
        type:'String',
        fieldName:'GpoAddress',
        label:'Gpo Address'
    },
    {
        type:'String',
        fieldName:'Membership_Status__c',
        label:'Membership Status'
    },
    {type: "button", typeAttributes: {
        iconName: 'utility:info',
        label: '',
        name: '',
        disabled: false,
        value: '',
        iconPosition: 'left'
    }}
    

]




    
}