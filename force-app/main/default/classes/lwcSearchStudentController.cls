public with sharing class lwcSearchStudentController {

/** 
* Tên hàm :getListClass
* Chức năng của hàm : lấy danh sách lớp
* @param
* @return danh sách lớp
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
@AuraEnabled(cacheable=true)
public static List<Lop__c> getListClass(){
    return [SELECT id, TenLop__c FROM Lop__c ORDER BY TenLop__c];
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
    public static List<HocSinh__c> getListStudent(String lastName,Boolean isCheck,String idClass,String startDay,String endDay,Integer limitRecord, Integer currentPage){
        try{
            String queryStudent = 'SELECT Id, MaHocSinh__c, HoHocSinh__c, TenHocSinh__c, NgaySinh__c, GioiTinh__c, Diem1__c, Diem2__c,Diem3__c, DiemTB__c,TinhTrang__c FROM  HocSinh__c';
            // rap điều kiện
            queryStudent = createStringQuery(queryStudent, lastName, idClass, startDay, endDay);
            
            if (isCheck) {
                queryStudent += ' ORDER BY TenHocSinh__c  ';
            } else {
                queryStudent += ' ORDER BY TenHocSinh__c  DESC ';
            }
            queryStudent += ('LIMIT ' + limitRecord);
            Integer offsetNum = (limitRecord * (currentPage - 1));
            queryStudent += 'OFFSET '+ offsetNum;
            System.debug(queryStudent);
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
public static String createStringQuery(String queryString, String lastName, String classId, String startBirthday, String endBirthday){ 
    try {
        if (String.isNotBlank(lastName.trim())) {
            queryString += ' AND TenHocSinh__c like \'%' + String.escapeSingleQuotes(lastName.trim()) + '%\'';
        }
    
        if (String.isNotBlank(classId)) {
            queryString += ' AND Lop__c =\'' + classId + '\'';  
        }

        if (startBirthday != '' && endBirthday != '') {
            queryString += 'AND NgaySinh__c > '+startBirthday+' AND NgaySinh__c < '+ endBirthday;
        }

    // thay đổi chuỗi
        queryString = queryString.replaceFirst('AND', 'WHERE');
        return queryString;           
    } catch (Exception ex) {
        throw new AuraHandledException(ex.getMessage());
    }
}

/** 
* Tên hàm :getCountStudent
* Chức năng của hàm :Đếm số lượng học sinh thỏa điều kiện truy vấn
* @param lastName:tên họ sinh; isSort:sắp tăng; classId:id lớp; startBirthday:đk ngày sinh ;endBirthday: đk ngày sinh cuối; currentPage: trang hiện tại
* @return 
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
@AuraEnabled
public static Integer getCountStudent(String lastName, String idClass,String startDay,String endDay){
    try{

        String queryCount = 'SELECT COUNT() FROM HocSinh__c';
        queryCount = createStringQuery(queryCount, lastName, idClass,startDay, endDay );
        Integer count = Database.countQuery(queryCount);
        return count;
    }catch( Exception ex){
        throw new AuraHandledException(ex.getMessage());
    }
}

/** 
* Tên hàm :deleteAllStudent
* Chức năng của hàm :xóa danh sách học sinh được chọn
* @param listDelete: list ds học sinh được chọn
* @return 
* @created: 2022/07/12 Ho Thi Thom
* @modified:    
*/ 
@AuraEnabled
    public static void deleteAllStudent(List<String> listDelete){
        try{
            List<HocSinh__c> students = [SELECT Id FROM HocSinh__c WHERE Id IN: listDelete];
            delete students;
        }catch( Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}