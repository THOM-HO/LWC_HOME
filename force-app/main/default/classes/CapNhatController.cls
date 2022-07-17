/**
* ClassName: CapNhatController
* ClassDetail: CapNhatController class
* @created: 2022/06/22 Hồ Thị Thơm
* @modified:
*/
public with sharing class CapNhatController {
    
public Condition cond {get; set;} 
  //Chứa tên page đã duy chuyển qua
private String page=''; 

/** 
* Tên hàm :CapNhatController
* Chức năng của hàm : Khởi tạo dữ liệu khi trang load lên lần đầu
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/    
    public CapNhatController() {
        String idStudent = ApexPages.currentPage().getParameters().get('id'); //id của hs cần cập nhật
        page = ApexPages.currentPage().getParameters().get('page'); 
        cond= new Condition(); 
        initData( idStudent);
    }
    
 /** 
* Tên hàm :initData
* Chức năng của hàm : Khởi tạo dữ liệu khi trang load lên lần đầu
* @param idStudent
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/ 
    public void initData(String param){
        try {
        HocSinh__c hs= new HocSinh__c();
         			hs=[SELECT  MaHocSinh__c,HoHocSinh__c,TenHocSinh__c,NgaySinh__c,GioiTinh__c, Diem1__c, Diem2__c,Diem3__c
					    FROM HocSinh__C
					    WHERE Id = :param ];
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
* Tên hàm :initData
* Chức năng của hàm : quay lại trang trước
* @param idStudent
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/ 
    public PageReference back(){
        PageReference pg = new PageReference('/apex/'+page);
        pg.getParameters().put('id',cond.objHsCondition.Id);
		return pg;
    }
    
 /** 
* Tên hàm :initData
* Chức năng của hàm : cập nhật học sinh
* @param idStudent
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public PageReference updateStudent(){
        HocSinh__c student= new HocSinh__c();
        student.Id= cond.objHsCondition.Id;
        student.TenHocSinh__c= cond.objHsCondition.TenHocSinh__c;
        student.HoHocSinh__c =  cond.objHsCondition.HoHocSinh__c;
        student.GioiTinh__c= cond.objHsCondition.GioiTinh__c;
        student.NgaySinh__c= cond.objHsCondition.NgaySinh__c;
        student.Diem1__c=cond.objHsCondition.Diem1__c;
        student.Diem2__c=cond.objHsCondition.Diem2__c;
        student.Diem3__c=cond.objHsCondition.Diem3__c;
        
        update student;
        
        PageReference pg = new PageReference('/apex/'+page);
        pg.getParameters().put('id',cond.objHsCondition.Id);
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