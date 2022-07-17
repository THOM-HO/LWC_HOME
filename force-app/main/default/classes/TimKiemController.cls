/**
* ClassName: TimKiemController
* ClassDetail: Truy xuất dữ liệu database theo các lần search có điều kiện, thực hiện một số even Thêm mới, chỉnh sửa, xóa đối tượng, xóa hàng loạt, xem chi tiết
* @created: 2022/06/23 Ho Thi Thom
* @modified:
*/

public with sharing class TimKiemController {

// select public List<Lop__c> 
 public List<SelectOption> options {get; set;} 
// Danh sách học sinh hiển thị ra view   
 public List<HocSinh> lvStudents{get;set;} 
// Đối tượng Cond
 public Condition cond {get; set;} 
// Số lượng học sinh truy vấn được
 public Integer count {get; set;} 
// Trang hiện tại được chọn
 public Integer currentPage {get; set;} 
// Số dòng giới hạn hiển thị  
 private Integer LIMIT_ROW = 5;
// Tổng số trang phân trang
 public Integer totalPage {get; set;} 
// Số trang hiển thị
 public Integer numberPageShow = 3; 
// List trang được hiển thị EX: 1,2,3 OR 2,3,4
 public List<Integer> listPage {set; get;} 
// check hiện thông báo chưa nhập điều kiện tìm kiếm
 private String SELECT_ALL = 'ALL';
 //Trạng thái hiển thị thông báo
 public Boolean isNotification {get; set;}

/** 
* Tên hàm :TimKiemController
* Chức năng của hàm : Khởi tạo mặt định
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/ 
    public TimKiemController() {
        options = new List<SelectOption>();
        lvStudents = new List<HocSinh>();
        listPage = new List<Integer>(); 
        cond = new Condition();
        initData();
        isNotification=false;
    }  

/** 
* Tên hàm :initData
* Chức năng của hàm : Khởi tạo dữ liệu khi trang load lên lần đầu
* @param Tham số 
* @return Giá trị trả về 
* @created: 2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/ 
    public void initData(){
        try {
            // Lấy dữ liệu danh sách lớp hiển thị ra selection
            options.add(new SelectOption(SELECT_ALL, 'Tất cả') )  ;
			for(Lop__c lop : [SELECT Id, TenLop__c FROM Lop__c ORDER BY TenLop__c]) {
               options.add(new SelectOption(lop.Id, lop.TenLop__c) )  ;           
            }
             if (options.isEmpty()) {
				//ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, System.Label.MSG_ERROR_NORESULT));
				ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Data not found'));
			}
            //Trang hiện tại
            currentPage = 1;
            totalPage = 1;
            //tổng số trang
            countStudent();
            queryStudent();
		} catch (Exception ex) {
		    this.getExceptionMessage(ex);
		}
        
    }
    
/** 
* Tên hàm :createStringQuery
* Chức năng của hàm : Tạo chuổi điều kiện query
* @param  queryString:  Chuỗi điều kiện đầu
* @return : Chuỗi điều kiện query
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/ 
     public String createStringQuery(String queryString){
        String TenHS= cond.objHsCondition.TenHocSinh__c;  
        String LopId= cond.lopId;
        Date Ngay1= cond.objHsCondition.NgaySinh__c;
        Date Ngay2= cond.objHsCondition1.NgaySinh__c;
         
		try {
			if(TenHS != null && TenHS.trim() != '') {
				queryString += ' AND TenHocSinh__c like \'%' + String.escapeSingleQuotes(TenHS)+'%\'';
           }
           
			if(LopId != null && LopId != SELECT_ALL) {
				queryString += ' AND Lop__c =\''+LopId+'\'';  
		   }
    
            if( Ngay1 != null && Ngay2 != null){
               //Cắt lấy ngày
       		   String dt1= String.valueOf(Ngay1).substring(0,10);
       		   String dt2= String.valueOf(Ngay2).substring(0,10);
               queryString += 'AND NgaySinh__c > '+dt1+' AND NgaySinh__c < '+ dt2;
            }

           // thay đổi chuỗi
		    queryString = queryString.replaceFirst('AND', 'WHERE');

			return queryString;           
		} catch (Exception ex) {
			this.getExceptionMessage(ex);
            return null;
		}
    } 
    
 /** 
* Tên hàm :countStudent
* Chức năng của hàm : Đếm số lượng đối tượng tìm được và setup phân trang
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
     public void countStudent(){
        try{

            String queryCount='SELECT COUNT() FROM HocSinh__c';
            queryCount= createStringQuery(queryCount);
            count = Database.countQuery(queryCount);
            totalPage = (Integer) Math.ceil((Decimal) count / LIMIT_ROW);
        }catch( Exception ex){
            this.getExceptionMessage(ex);
        }
     }
    
/** 
* Tên hàm :queryStudent
* Chức năng của hàm : Lấy danh sách học sinh theo điều kiện
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void queryStudent(){
        try{

            lvStudents.clear();
            String queryStudent='SELECT Id, MaHocSinh__c, HoHocSinh__c, TenHocSinh__c, NgaySinh__c, GioiTinh__c, Diem1__c, Diem2__c,Diem3__c, DiemTB__c,TinhTrang__c FROM  HocSinh__c';
            // rap điều kiện
            queryStudent= createStringQuery(queryStudent);
            if(cond.objHsCondition.GioiTinh__c){
                queryStudent += ' ORDER BY TenHocSinh__c  ';
            }else{
                queryStudent += ' ORDER BY TenHocSinh__c  DESC ';
            }
            queryStudent +=' LIMIT '+LIMIT_ROW;
            Integer offsetNum= (LIMIT_ROW * (currentPage - 1));
            queryStudent += 'OFFSET '+offsetNum;
            List<HocSinh__c> hs=  Database.query(queryStudent);
            if(!hs.isEmpty()){
                for(HocSinh__c item : hs){
                    lvStudents.add(new HocSinh(false,item));
                }
                getPages();
            }
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
   }
    
/** 
* Tên hàm :getPages
* Chức năng của hàm : Tạo phân trang
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void getPages(){
        try{

            listPage.clear();
            Integer distance = (Integer) Math.ceil((Decimal) numberPageShow / 2);
            Integer firstPage = currentPage - distance + 1;
        
        if(firstPage > totalPage - distance){
            firstPage = totalPage - numberPageShow + 1;
        }
        if(firstPage < 1) {
			firstPage = 1;
        }
        Integer index = 0;
        if(totalPage < numberPageShow) index = numberPageShow - totalPage;
        for(Integer i = index; i < numberPageShow; i++){
            listPage.add(firstPage++);
        }
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }
    
 /** 
* Tên hàm :searchStudent
* Chức năng của hàm : được gọi khi sublit button tìm kiếm trả về danh sách học sinh và phân trang
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void searchStudent(){
        try{
        lvStudents.clear();
        count=0;
        Date Ngay1= cond.objHsCondition.NgaySinh__c;
        Date Ngay2= cond.objHsCondition1.NgaySinh__c;
            if(cond.objHsCondition.TenHocSinh__c != null ||(cond.LopId != null) ||(Ngay1 != null && Ngay2!= null)){
                  isNotification=false;
                  currentPage = 1;
                         countStudent();
           		  queryStudent(); 
            }else{
               isNotification= true; 
            } 
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    } 

/** 
* Tên hàm :addStudent
* Chức năng của hàm : được gọi để duy chuyển sang trang thêm học sinh
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public PageReference addStudent(){
        PageReference pg = new PageReference('/apex/VF_ThemMoi');
		return pg;
    }
    
/** 
* Tên hàm :goDetail
* Chức năng của hàm : được gọi để duy chuyển sang trang thêm học sinh
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public PageReference goDetail(){
        String param = ApexPages.currentPage().getParameters().get('index');
        // String idHS = lvStudents.get(Integer.valueOf(param)).objHocSinh.Id;
        PageReference pg = new PageReference('/apex/VF_ChiTiet');
        pg.getParameters().put('id',param);
		return pg;
    }
    
/** 
* Tên hàm :deleteStudent
* Chức năng của hàm : xóa 1 học sinh
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void deleteStudent(){
        try{
        String param = ApexPages.currentPage().getParameters().get('index');
        // String idHS = lvStudents.get(Integer.valueOf(param)).objHocSinh.Id;
        HocSinh__c student= new HocSinh__c(Id=param);
        delete student;
        currentPage = 1;
        countStudent();
        queryStudent(); 
    }catch(Exception ex){
        this.getExceptionMessage(ex);
    }
    }

/** 
* Tên hàm :deleteCheck
* Chức năng của hàm : duyệt danh sách học sinh được check và xóa
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void deleteCheck(){
        try{
        List<HocSinh__c> students= new List<HocSinh__c>();
        for(HocSinh item : lvStudents){
            if(item.check){
                String id= item.objHocSinh.Id;
                HocSinh__c hs= new HocSinh__c(Id=id);
       			students.add(hs); 
            }
        }
        delete(students);
        currentPage = 1;
        countStudent();
        queryStudent(); 
        cond.objHsCondition1.GioiTinh__c=false;
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }

/** 
* Tên hàm :checkAll
* Chức năng của hàm : check true học sinh khi checkbox checkAll được kích hoạt và ngược lại
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public void checkAll(){
        try{
        if(cond.objHsCondition1.GioiTinh__c){
            for(HocSinh student : lvStudents){
            student.check=true;
          }
        }else{
           for(HocSinh student : lvStudents){
            student.check=false; 
           }
        }
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }

/** 
* Tên hàm :updateStudent
* Chức năng của hàm : duy chuyển sang trang cập nhật học sinh
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom    
*/
    public PageReference updateStudent(){
        String param = ApexPages.currentPage().getParameters().get('index');
        // String idHS = lvStudents.get(Integer.valueOf(param)).objHocSinh.Id;
        PageReference pg = new PageReference('/apex/VF_CapNhat');
        pg.getParameters().put('id',param);
        pg.getParameters().put('page','VF_TimKiem');
		return pg;
    }
    
/** 
* Tên hàm :nextPage
* Chức năng của hàm : phân trang, sang trang tiếp theo
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom  
*/
    public void nextPage(){
        try{
        if(currentPage + 1 > totalPage )return;
          currentPage +=1;
         queryStudent();
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }

/** 
* Tên hàm :prevPage
* Chức năng của hàm : phân trang, trang trước đó
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:2022/07/01 Ho Thi Thom
*/
	public void prevPage(){
        try{
        if(currentPage == 1 )return;
        currentPage -=1;
           queryStudent();
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }  
    }

/** 
* Tên hàm :firstPage
* Chức năng của hàm : phân trang, duy chuyển lại trang đầu tiên
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:  2022/07/01 Ho Thi Thom
*/   
    public void firstPage(){
        try{
        currentPage =1;
        queryStudent();
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }
    
/** 
* Tên hàm :lastPage
* Chức năng của hàm : phân trang, duy chuyển lại trang cuối cùng
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:  2022/07/01 Ho Thi Thom
*/   
    public void lastPage(){
        try{
        currentPage = totalPage;
        queryStudent();
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }
    
/** 
* Tên hàm :setPage
* Chức năng của hàm : phân trang, duy chuyển sang trang tùy chọn
* @param Tham số : 
* @return : 
* @created:2022/06/23 Ho Thi Thom
* @modified:  2022/07/01 Ho Thi Thom
*/ 
    public void setPage(){
        try{
        String param = ApexPages.currentPage().getParameters().get('index');
        currentPage = Integer.valueOf(param);
        queryStudent();
        }catch(Exception ex){
            this.getExceptionMessage(ex);
        }
    }

    /**
	* getExceptionMessage
	* Show exception message
	* @param: ex Exception
	* @return: 
	* @created: 2019/02/16 Nguyen Van A
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
        public HocSinh__c objHsCondition1 {get; set;}
		public String lopId {get; set;}
		public Condition () {
			objHsCondition = new HocSinh__c();
            objHsCondition1 = new HocSinh__c();
		}      
	}
    class HocSinh{
      public Boolean check {get; set;}
      public HocSinh__c objHocSinh {get; set;}
        public HocSinh() {
        }
        public HocSinh(Boolean check, HocSinh__c hs){
            this.check= check;
            this.objHocSinh= hs;
        }
    }
}