public with sharing class lwcSearchStudentController {
  
@AuraEnabled(cacheable=true)
public static List<Lop__c> getListClass(){
    return [SELECT id, TenLop__c FROM Lop__c ORDER BY TenLop__c];
}

@AuraEnabled(cacheable=true)
    public static List<HocSinh__c> getListStudent(String lastName,Boolean isCheck,String idClass,String startDay,String endDay){
        return [SELECT Id, HoHocSinh__c, TenHocSinh__c, Lop__c, GioiTinh__c, NgaySinh__c, Diem1__c, Diem2__c, Diem3__c, DiemTB__c, TinhTrang__c FROM HocSinh__c];
    }

}