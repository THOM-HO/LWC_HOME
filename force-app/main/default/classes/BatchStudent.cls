/** 
* ClassName: BatchStudent
* ClassDetail: Chạy Batch đổ dữ liệu điểm từ Học Sinh sang bảng Điểm
* @created: 2022/07/15 Ho Thi Thom
* @modified:
*/
global class BatchStudent implements Database.Batchable<SObject>, Database.Stateful, Schedulable{
/** 
* Tên hàm :execute
* Chức năng của hàm : Thực thi batch
* @param 
* @return
* @created: 
* @modified: 
*/ 
    global void execute(SchedulableContext ctx) {
        Database.executeBatch(new BatchStudent(), 2);
    }

/** 
* Tên hàm :start
* Chức năng của hàm : Lấy dữ liệu học sinh
* @param 
* @return danh sách học sinh 
* @created: 
* @modified: 
*/   
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            [SELECT Id, Diem1__c, Diem2__c, Diem3__c FROM HocSinh__c]
        );
    }

/** 
* Tên hàm :execute
* Chức năng của hàm : Xử lí đổ điểm vào bảng điểm
* @param 
* @return
* @created: 
* @modified: 
*/
    global void execute(Database.BatchableContext bc, List<HocSinh__c> records){
        
        //Chứa danh sách bảng Diem__c
        List<Diem__c> listPoints =  new List<Diem__c>();
        listPoints = [SELECT Id, Diem__c, HocSinh__c, Mon__c FROM Diem__c WHERE HocSinh__c IN :records];
        
        //Chứa ds bảng điểm đã được map theo Id HocSinh__c
        Map<String, List<Diem__c>> mapPoint= new Map<String, List<Diem__c>>();
        mapPoint= mapPointById(listPoints);

        //Chứa danh sách bảng điểm cần update hoặc thêm mới
        List<Diem__c> listPointUpdate =  new List<Diem__c>();

        if(mapPoint.size() != 0 ){//Kiểm tra danh sách điểm trong bảng Diem__c trống hay không, trông thì thêm mới hoàn toàn
            
            for (HocSinh__c student : records) {
                //Lấy danh sách điểm tương ứng với Id Học Sinh
                List<Diem__c> listPoint = mapPoint.get(student.Id);
                 //Kiểm tra danh sách điểm trong bảng điểm tương ứng với Id Hoc Sinh nếu khác 0 thì kiểm tra tiếp, bằng 0 thì thêm mới
                if (listPoint.size() != 0) {
                    Boolean flagHoa = true;//Cờ cho các điểm để kiểm tra trong bảng điểm có điểm môn đó của sinh viên đó chưa
                    Boolean flagLy = true;
                    Boolean flagToan= true;

                    for(Diem__c point : listPoint){
                      // Kiểm tra từng điểm , nếu có và có thay đổi thì đưa vào list cần update hoặc thêm
                        if(point.Mon__c == 'Hóa'){
                            flagHoa = false; 
                            if(point.Diem__c != student.Diem1__c){
                                listPointUpdate.add(new Diem__c(Id = point.Id, Diem__c = student.Diem1__c));
                            }
                        }
                        if(point.Mon__c == 'Lý'){
                            flagLy = false;
                            if(point.Diem__c != student.Diem2__c){
                                listPointUpdate.add(new Diem__c(Id = point.Id, Diem__c = student.Diem2__c));
                            }
                        }
                        if(point.Mon__c == 'Toán'){
                            flagToan = false; 
                            if(point.Diem__c != student.Diem3__c){
                                listPointUpdate.add(new Diem__c(Id = point.Id, Diem__c = student.Diem3__c));
                            }
                        }
                    }
                    //Kiểm tra nếu trong bảng điểm không có điểm môn của học sinh đó thì thêm mới
                    if(flagHoa == true){
                        listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem1__c, Mon__c = 'Hóa'));
                    }
                    if(flagLy == true){
                        listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem2__c, Mon__C = 'Lý'));
                    }
                    if(flagToan == true){
                        listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem2__c, Mon__C = 'Toán'));
                    }
                } else {
                    listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem1__c, Mon__c = 'Hóa'));
                    listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem2__c, Mon__C = 'Lý'));
                    listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem3__c, Mon__c = 'Toán'));
                }
            }
        } else {
            System.debug('rc'+records.size());
            for (HocSinh__c student : records) {
                listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem1__c, Mon__c = 'Hóa'));
                listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem2__c, Mon__C = 'Lý'));
                listPointUpdate.add(new Diem__c(HocSinh__c = student.Id, Diem__c = student.Diem3__c, Mon__c = 'Toán'));
            }
        }
    // insert hoặc update 
        upsert listPointUpdate;
    }

/** 
* Tên hàm :finish
* Chức năng của hàm : Thực thi khi kết thúc chạy Batch
* @param 
* @return danh sách học sinh 
* @created: 
* @modified: 
*/
    global void finish(Database.BatchableContext bc){
       System.debug('Done');
    }

/** 
* Tên hàm :mapPointById
* Chức năng của hàm : Mapping thông tin điểm theo dạng 
* @param listPoint : danh sách điểm trong bảng điểm
* @return listMap :danh sách điểm được map theo idHocSinh
* @created: 
* @modified: 
*/
    global Map<String,List<Diem__c>> mapPointById(List<Diem__c> listPoint) {
        Map<String, List<Diem__c>> listMap = new  Map<String, List<Diem__c>>();
        for(Diem__c point : listPoint){
           if (!listMap.containsKey(point.HocSinh__c)) {
            List<Diem__c> points = new List<Diem__c>();
            points.add(point);
            listMap.put(point.HocSinh__c,points);
           } else{
           listMap.get(point.HocSinh__c).add(point);
           }
        }
        return listMap;
    }
}

// List<Diem__c> lista= [SELECT Id FROM Diem__c];
// delete lista;
// //Database.executeBatch(new BatchStudent(), 2);
// String abc = '0 0 * * * ?';
// System .schedule('BatchStudent', abc, new BatchStudent());