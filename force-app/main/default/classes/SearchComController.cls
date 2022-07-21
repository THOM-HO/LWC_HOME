/**
* ClassName: SearchComController
* ClassDetail: Truy xuất dữ liệu database theo các lần search có điều kiện, thực hiện một số even lấy danh sách lớp, danh sách học sinh, xóa đối tượng, xóa hàng loạt
* @created: 2022/07/12 Ho Thi Thom
* @modified:
*/

public with sharing class SearchComController {

/** 
* Tên hàm :deleteStudent
* Chức năng của hàm : Xóa 1 học sinh
* @param studentId : id cuả một học sinh
* @return 
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
    @AuraEnabled
    public static void deleteStudent(String studentId){
        Database.delete(studentId);
    }

/** 
* Tên hàm :deleteAllStudent
* Chức năng của hàm : Xóa danh sách học sinh
* @param listDelete: danh sách sinh viên cần xóa
* @return 
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
    @AuraEnabled
    public static void deleteAllStudent(List<String> listDelete){
        
        List<HocSinh__c> students = [SELECT Id FROM HocSinh__c WHERE Id IN: listDelete];
        delete students;
    }

/** 
* Tên hàm :queryStudent
* Chức năng của hàm : Tuy vấn danh sách học sinh thỏa điều kiện 
* @param lastName:tên họ sinh; isSort:sắp tăng; classId:id lớp; startBirthday:đk ngày sinh ;endBirthday: đk ngày sinh cuối; currentPage: trang hiện tại
* @return List<HocSinh__c>: danh sách học sinh thỏa điều kiện
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/  
    @AuraEnabled
    public  static List<HocSinh__c> queryStudent(String lastName, Boolean isSort, String classId, Date startBirthday, Date endBirthday, Integer currentPage){
        try{
            String queryStudent = 'SELECT Id, MaHocSinh__c, HoHocSinh__c, TenHocSinh__c, NgaySinh__c, GioiTinh__c, Diem1__c, Diem2__c,Diem3__c, DiemTB__c,TinhTrang__c FROM  HocSinh__c';
            // rap điều kiện
            queryStudent = createStringQuery(queryStudent, lastName, classId,startBirthday, endBirthday);
            
            if (isSort) {
                queryStudent += ' ORDER BY TenHocSinh__c  ';
            } else {
                queryStudent += ' ORDER BY TenHocSinh__c  DESC ';
            }
            queryStudent += ' LIMIT 5 ';
            Integer offsetNum = (5 * (currentPage - 1));
            queryStudent += 'OFFSET '+ offsetNum;
            List<HocSinh__c> hs=  Database.query(queryStudent);
            return hs;
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
   }
   
   /** 
* Tên hàm :createStringQuery
* Chức năng của hàm :Tạo câu truy vấn 
* @param lastName:tên họ sinh; isSort:sắp tăng; classId:id lớp; startBirthday:đk ngày sinh ;endBirthday: đk ngày sinh cuối; currentPage: trang hiện tại
* @return 
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
   @AuraEnabled
   public static String createStringQuery(String queryString, String lastName, String classId, Date startBirthday, Date endBirthday){ 
     
    String allClass = 'SELECT_ALL';
    try {
        if (String.isNotBlank(lastName.trim())) {
            queryString += ' AND TenHocSinh__c like \'%' + String.escapeSingleQuotes(lastName.trim()) + '%\'';
       }
       
        if (String.isNotBlank(classId) && !classId.equals(allClass)) {
            queryString += ' AND Lop__c =\'' + classId + '\'';  
       }

        if (startBirthday != null && endBirthday != null) {
           //Cắt lấy ngày
              String day1 = String.valueOf(startBirthday).substring(0, 10);
              String day2 = String.valueOf(endBirthday).substring(0, 10);
           queryString += 'AND NgaySinh__c > '+day1+' AND NgaySinh__c < '+ day2;
        }

       // thay đổi chuỗi
        queryString = queryString.replaceFirst('AND', 'WHERE');

        return queryString;           
    } catch (Exception ex) {
    //    return queryString;
    throw new AuraHandledException(ex.getMessage());
    }
}

/** 
* Tên hàm :countStudent
* Chức năng của hàm :Đếm số lượng học sinh thỏa điều kiện truy vấn
* @param lastName:tên họ sinh; isSort:sắp tăng; classId:id lớp; startBirthday:đk ngày sinh ;endBirthday: đk ngày sinh cuối; currentPage: trang hiện tại
* @return 
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
@AuraEnabled
public static Integer countStudent(String lastName, Boolean isSort, String classId,Date startBirthday, Date endBirthday){
    try{

        String queryCount = 'SELECT COUNT() FROM HocSinh__c';
        queryCount = createStringQuery(queryCount, lastName, classId,startBirthday, endBirthday );
        Integer count = Database.countQuery(queryCount);
        return count;
    }catch( Exception ex){
        // return 0;
        throw new AuraHandledException(ex.getMessage());
    }
 }

/** 
* Tên hàm :methodGetDataClass
* Chức năng của hàm : lấy danh sách lớp
* @param
* @return listData: danh sách lớp
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
@AuraEnabled
    public static List<Lop__c> methodGetDataClass(){
        try {
            List<Lop__c> listData = [SELECT Id, TenLop__c FROM Lop__c ORDER BY TenLop__c];
            return listData;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}