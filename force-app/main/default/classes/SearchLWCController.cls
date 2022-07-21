public with sharing class SearchLWCController {

// @AuraEnabled(cacheable=true)
    // public static List<Account> getAccounts(string searchKey){
    //     return [SELECT id, name,phone, industry, website FROM account WHERE name LIKE : '%'+searchKey+ '%'];
    // }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, AnnualRevenue, Industry, Phone FROM Account];
    }
}