/**
* ClassName: HocSinhTriggerHandler
* ClassDetail: Chứa các hàm kiểm tra, xử lí dữ liệu
* @created: 2022/07/11 Ho Thi Thom
* @modified:
*/
public class HocSinhTriggerHandler {
    
    private static String STR_ERROR_EMPTY = 'Chưa nhập {0}';
    private static String STR_ISVALIDATE = '{0} chưa hợp lệ!';
    private static final Integer BEGIN_AGE = 6, END_AGE = 18 ;
    private static String STR_EMPTY_MATH = 'Hãy vào điểm cho môn {0}';
    
/** 
* Tên hàm :onBeforeInsert
* Chức năng của hàm : Xử lí trước khi thêm hoc sinh vào database
* @param list_trigger_new : chứa sinh viên được insert
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/ 
    public static void onBeforeInsert(List<HocSinh__c> list_trigger_new) { 
        
        //duyệt từng phần tử trong list
       for(HocSinh__c hs : list_trigger_new) {
        //Kiểm tra ngày sinh đã được nhập hay chưa
            if (hs.NgaySinh__c == null) {
                hs.NgaySinh__c.addError(String.format(STR_ERROR_EMPTY, new List<String> {'ngày sinh'}));
            }
        //Kiểm tra tuổi hợp lệ không
            if (!HocSinhHandler.isAgeValid(hs.NgaySinh__c, BEGIN_AGE, END_AGE)){
                hs.NgaySinh__c.addError(String.format(STR_ISVALIDATE, new List<String> {'Tuổi'}));
            }
        // Kiểm tra điểm môn Hóa được nhập chưa
            if (hs.Diem1__c == null) {
                hs.Diem1__c.addError(String.format(STR_EMPTY_MATH, new List<String> {'Hóa'}));
            }
        // Kiểm tra điểm môn Hóa được nhập chưa
            if (hs.Diem2__c == null) {
                hs.Diem2__c.addError(String.format(STR_EMPTY_MATH, new List<String> {'Lý'}));
            }
        // Kiểm tra điểm môn Hóa được nhập chưa
            if (hs.Diem3__c == null) {
                hs.Diem3__c.addError(String.format(STR_EMPTY_MATH, new List<String> {'Toán'}));
            }
        }  
    }
    
/** 
* Tên hàm :onAfterInsert
* Chức năng của hàm : Xử lí sau khi thêm hoc sinh vào database
* @param list_trigger_new : chứa sinh viên được insert
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/ 
    public static void onAfterInsert(List<HocSinh__c> list_trigger_new) {
        // Cập nhật sỉ số của các lớp
       updateClass(list_trigger_new); 
       // Khởi tạo list chứa dánh sách học sinh
       List<HocSinh__c> listStudent= new List<HocSinh__c>(); 
       // duyệt list
       for(HocSinh__c item : list_trigger_new){
          HocSinh__c student = new HocSinh__c();
          student.Id = item.Id;
        // Kiểm tra điểm trung bình để cập nhật xếp loại
          student.XepLoai__c = HocSinhHandler.classification(item);
          listStudent.add(student);
       } 
       //cập nhật lại thông tin học sinh
       update listStudent;
    }

/** 
* Tên hàm :onAfterUpdate
* Chức năng của hàm : Xử lí cập nhật thông tin sau khi update hoc sinh vào database
* @param list_trigger_new : chứa thông tin danh sách sinh viên sau khi được update
* @param list_trigger_old : chứa thông tin danh sách sinh viên trước khi được update
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/ 
    public static void onAfterUpdate(List<HocSinh__c> list_trigger_new, List<HocSinh__c> list_trigger_old){
       
    List<HocSinh__c> listTriggerNew = new List<HocSinh__c>();// list chứa học sinh mới
    List<HocSinh__c> listTriggerOld = new List<HocSinh__c>();// list chứa học sinh cũ
    listTriggerNew = list_trigger_new;
    listTriggerOld = list_trigger_old;

    List<HocSinh__c> listTrigger = new List<HocSinh__c>();//list chứa học sinh
    listTrigger.addAll(listTriggerNew);
    listTrigger.addAll(listTriggerOld);
    updateClass(listTrigger); // cập nhật sỉ số cho các lớp
       // cập nhật xếp loại
    if (HocSinhHandler.flag) {
        HocSinhHandler.flag = false;
        List<HocSinh__c> listStudent = new List<HocSinh__c>(); 
        for(HocSinh__c item: list_trigger_new) {
            HocSinh__c student = new HocSinh__c();
            student.Id = item.Id;
            student.XepLoai__c = HocSinhHandler.classification(item);
            listStudent.add(student);
        } 
        if (!listStudent.isEmpty()) {
            update listStudent;
            HocSinhHandler.flag = true;
        }
    }
}

/** 
* Tên hàm :onAfterDelete
* Chức năng của hàm : Xử lí cập nhật thông tin sau khi delete hoc sinh từ database
* @param list_trigger_old: chứa thông tin danh sách sinh viên trước khi được delete
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/ 
    public static void onAfterDelete(List<HocSinh__c> list_trigger_old){
    // Cập nhật sỉ số cho các lớp
     updateClass(list_trigger_old); 
    }

    
/** 
* Tên hàm :updateClass
* Chức năng của hàm : cập nhật lớp 
* @param listStudent: chứa thông tin danh sách sinh viên
* @return 
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/
    public static void updateClass(List<HocSinh__c> listStudent){
        Map<ID, Integer> maphs = new Map<ID, Integer>();     
          for(HocSinh__c hs : listStudent){
              if (!maphs.containsKey(hs.Lop__c)) {
                  maphs.put(hs.Lop__c, 1);
              } else {
                  maphs.put(hs.Lop__c,maphs.get(hs.Lop__c) + 1);
              }
          }
        List<Lop__c> lops= new List<Lop__c> ();
         for (String key : maphs.keySet()) {
    		 Lop__c c = Database.query('SELECT Id,SiSo__c, HocSinhRot__c, HocSinhDau__c FROM Lop__c WHERE Id = \'' + key + '\'');
             c.SiSo__c = Database.countQuery('SELECT COUNT() FROM HocSinh__c WHERE Lop__c = \'' + key + '\'' );
             c.HocSinhRot__c = Database.countQuery('SELECT COUNT() FROM HocSinh__c WHERE Lop__c = \'' + key + '\' AND DiemTB__c < 5 ');
             c.HocSinhDau__c = Database.countQuery('SELECT COUNT() FROM HocSinh__c WHERE Lop__c = \'' + key + '\' AND DiemTB__c >= 5 ');
             lops.add(c);
		}
         update lops;
    }
      
}