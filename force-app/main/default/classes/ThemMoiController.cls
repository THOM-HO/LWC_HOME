/**
* ClassName: ThemMoiController
* ClassDetail: ThemMoiController class
* @created: 2022/06/22 Nguyen Van A
* @modified:
*/
public with sharing class ThemMoiController {

    // list danh sách lớp
    public List<SelectOption> options {get; set;}
    //đối tượng Cond
    public Condition cond {get; set;} 
    
/** 
* Tên hàm :ThemMoiController
* Chức năng của hàm : Khởi tạo dữ liệu khi trang load lên lần đầu
* @param 
* @return 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/03 Ho Thi Thom    
*/    
    public ThemMoiController() {
        options = new List<SelectOption>();
        cond= new Condition();  
        initData();
    }
    
/** 
* Tên hàm :initData
* Chức năng của hàm : truy vấn dánh sách lớp
* @param 
* @return 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/03 Ho Thi Thom    
*/ 
    public void initData(){
        try {
            for(Lop__c lop : [SELECT Id, TenLop__c FROM Lop__c LIMIT 10]) {
               options.add(new SelectOption(lop.Id, lop.TenLop__c) )  ;           
            }
            if (options.isEmpty()) {
                //ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, System.Label.MSG_ERROR_NORESULT));
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Data not found'));
            }
        } catch (Exception ex) {
            this.getExceptionMessage(ex);
        }
        
    }
    
/** 
* Tên hàm :back
* Chức năng của hàm : quay về trang trước
* @param 
* @return 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/03 Ho Thi Thom    
*/ 
    public PageReference back(){         
        PageReference pg = new PageReference('/apex/VF_TimKiem');
        return pg;
    }
    
/** 
* Tên hàm :addStudent
* Chức năng của hàm : Thêm mới học sinh vào database
* @param 
* @return 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/03 Ho Thi Thom    
*/ 
    public PageReference addStudent(){
        HocSinh__c hs= new HocSinh__c();
        hs.Lop__c= cond.lopId;
        hs.TenHocSinh__c= cond.objHsCondition.TenHocSinh__c;
        hs.HoHocSinh__c =  cond.objHsCondition.HoHocSinh__c;
        hs.GioiTinh__c= cond.objHsCondition.GioiTinh__c;
        hs.NgaySinh__c= cond.objHsCondition.NgaySinh__c;
        hs.Diem1__c=cond.objHsCondition.Diem1__c;
        hs.Diem2__c=cond.objHsCondition.Diem2__c;
        hs.Diem3__c=cond.objHsCondition.Diem3__c;
        
    insert hs;
    // duy chuyển trang
    PageReference pg = new PageReference('/apex/VF_TimKiem');
    return pg;
    }
    
    /**
	* getExceptionMessage
	* Show exception message
	* @param: ex Exception
	* @return: 
	* @created: 2022/06/23 Ho Thi Thom
	* @modified:
	**/
	private void getExceptionMessage(Exception ex) {
		Apexpages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Label.MSG_ERROR_EXCEPTION'));
		ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, '====Message: ' + ex.getMessage()));
		ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, '====Line: ' + ex.getLineNumber()));
		ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, '====StackTrace: ' + ex.getStackTraceString()));
	}

    class Condition {
        public HocSinh__c objHsCondition {get; set;}
        public String lopId {get; set;}
        
        public Condition () {
            objHsCondition = new HocSinh__c();
        }
        
    } 
}