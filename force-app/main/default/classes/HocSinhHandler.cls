/**
* ClassName: HocSinhHandler
* ClassDetail: Chứa các xử lí cho trigger Học Sinh
* @created: 2022/07/11 Ho Thi Thom
* @modified:
*/
public class HocSinhHandler {

    public static Boolean flag = true;// Trạng thái update

/** 
* Tên hàm :isAgeValid
* Chức năng của hàm : xác định tuổi hợp lệ hay không
* @param birthDay : ngày sinh , BEGIN_AGE - END_AGE : khoảng tuổi hợp lệ
* @return true or false : tuổi hợp lệ nếu true và ngược lại
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/ 
    public static Boolean isAgeValid(Date birthDay, Integer BEGIN_AGE, Integer END_AGE){
        Integer days = birthDay.daysBetween(Date.Today());
        Integer age = Integer.valueOf(days / 365);
        if (age >= BEGIN_AGE && age <= END_AGE) return true;
        return false;
    } 

/** 
* Tên hàm :classification
* Chức năng của hàm : xác định học sinh đó có xếp loại gì
* @param student: đối tượng học sinh
* @return xếp loại
* @created: 2022/07/11 Ho Thi Thom
* @modified:    
*/ 
   public static String classification(HocSinh__c student){
    Double point = student.DiemTB__c;
        if (point >= 0 && point < 5) {
            return 'Yếu';
        } else if (point >=5 && point < 6.5) {
            return 'Trung Bình';
        } else if (point >= 6.5 && point < 8) {
            return 'Khá';
        } else if(point >= 8 && point <= 10) {
            return 'Giỏi';
        }
       return 'null'; 
   }
}