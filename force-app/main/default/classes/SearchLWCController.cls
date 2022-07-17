public with sharing class SearchLWCController {

@AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(string searchKey){
        return [SELECT id, name,phone, industry, website FROM account WHERE name LIKE : '%'+searchKey+ '%'];
    }
}