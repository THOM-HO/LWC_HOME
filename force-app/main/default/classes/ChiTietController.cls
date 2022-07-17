/**
* ClassName: ChiTietController
* ClassDetail: ChiTietController class
* @created: 2022/06/22 Hồ Thị Thơm
* @modified:
*/
public with sharing class ChiTietController {
    
    public Condition cond {get; set;}// Đối tượng
 
/** 
* Tên hàm :ChiTietController
* Chức năng của hàm : Khởi tạo mặt định khi trang load lên lần đầu
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public ChiTietController() {
        String param = ApexPages.currentPage().getParameters().get('id'); // get ID của Học sinh
        cond= new Condition(); 
        initData(param);
    }
    
/** 
* Tên hàm :initData
* Chức năng của hàm : lấy thông tin học sinh đổ vào đối tượng cond
* @param idHocSinh: id của học sinh
* @return 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void initData(String idHocSinh){
    try{
         HocSinh__c hs= new HocSinh__c();
         			hs=[SELECT  MaHocSinh__c,HoHocSinh__c,TenHocSinh__c,NgaySinh__c,GioiTinh__c, Diem1__c, Diem2__c,Diem3__c
					    FROM HocSinh__C
					    WHERE Id = :idHocSinh ];
        cond.objHsCondition.TenHocSinh__c = hs.TenHocSinh__c;
        cond.objHsCondition.HoHocSinh__c =hs.HoHocSinh__c;
        cond.objHsCondition.NgaySinh__c = hs.NgaySinh__c;
        cond.objHsCondition.GioiTinh__c = hs.GioiTinh__c;
        cond.objHsCondition.Diem1__c = hs.Diem1__c;
        cond.objHsCondition.Diem2__c = hs.Diem2__c;
        cond.objHsCondition.Diem3__c = hs.Diem3__c;
        cond.objHsCondition.Id = hs.Id;
    }catch (Exception ex) {
		this.getExceptionMessage(ex);
	}
    }
	
/** 
* Tên hàm :back
* Chức năng của hàm :quay về trang trước
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public PageReference back(){         
        PageReference pg = new PageReference('/apex/VF_TimKiem');
		return pg;
    }
    
/** 
* Tên hàm :updateStudent
* Chức năng của hàm : Khởi tạo mặt định
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public PageReference updateStudent(){
        PageReference pg = new PageReference('/apex/VF_CapNhat');
        pg.getParameters().put('id',cond.objHsCondition.Id);
        pg.getParameters().put('page','VF_ChiTiet');
		return pg;
    }
    
/** 
* Tên hàm :deleteStudent
* Chức năng của hàm : Xóa một học sinh
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
     public PageReference deleteStudent(){
        delete cond.objHsCondition;
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