import { Tuid, Map, Query, Action, Sheet, Book } from "tonva";

export interface UqOrder {
    //a: Tuid;
    //b: Tuid;
    SetCart: Action;
    RemoveFromCart: Action;
    MergeCart: Action;
    Order: Sheet;
    GetCart: Query;
    getPendingPayment: Query;
}

export interface UqProduct {
    ProductX: Tuid;
    Brand: Tuid;
    PriceX: Map;
    ProductChemical: Map;
    AgentPrice: Map;
    GetRootCategory: Query;
    GetRootCategories: Query;
    GetChildrenCategory: Query;
    SearchProduct: Query;
    SearchProductByCategory: Query;
    GetFutureDeliveryTime: Query;
}

export interface UqCommon {
    SalesRegion: Tuid;
    Language: Tuid;
    Address: Tuid;
    InvoiceInfo: Tuid;
    InvoiceType: Tuid;
    GetCountryProvinces: Query;
    GetProvinceCities: Query;
    GetCityCounties: Query;
}

export interface UqWebUser {
    WebUser: Tuid;
    WebUserContact: Map;
    webUserSetting: Map;
    WebUserCustomer: Map;
    WebUserContacts: Map;
}

export interface UqCustomer {
    Contact: Tuid;
    CustomerContacts: Map;
    CustomerSetting: Map;
    SearchWebUser: Query;
    getCustomerByKey: Query;
}

export interface UqCustomerDiscount {
    GetDiscount: Query;
}

export interface UqPromotion {
    GetPromotionPack: Query;
}

export interface UqWarehouse {
    GetInventoryAllocation: Query;
}

export interface UqSalesTask {
    $user: Tuid;
    Coupon: Tuid;
    MyCustomer: Tuid;
    MyCustomerUnit: Tuid;
    Task: Tuid;
    TaskType: Tuid;
    Organization: Tuid;
    CreateCoupon: Action;
    AddCouponCustomer: Action;
    IsCanUseCoupon: Action;
    CreateMyCustomer: Action;
    UpateCustomerMyCustomerMap: Action;
    CreateMyCustomerUnit: Action;
    ComputeAchievement: Action;
    UpdateNowMessage: Action;
    SavePeerAssigned: Action;
    AddTask: Action;
    ImportTask: Action;
    ExtensionTask: Action;
    CompletionTask: Action;
    CompletionCustomerInfoTask: Action;
    CreateTaskProduct: Action;
    CreateTaskProductPack: Action;
    CreateTaskProject: Action;
    CreatePosition: Action;
    CustomerMyCustomerMap: Map;
    Position: Map;
    TaskBiz: Map;
    SearchCoupon: Query;
    SearchTask: Query;
    SearchJKTask: Query;
    SearchTaskCompletion: Query;
    SearchHistoryTask: Query;
    SearchHistoryTaskByEmployee: Query;
    SearchHistoryTaskByCustomer: Query;
    searchMyCustomer: Query;
    searchMyCustomerActive: Query;
    searchMyCustomerUnit: Query;
    SearchTeam: Query;
    searchNowMessage: Query;
    searchMessage: Query;
    SearchPosition: Query;
    SearchAchievement: Query;
    SearchAchievementHistory: Query;
    getCustomerOrganization: Query;
    SearchTaskProduct: Query;
    SearchTaskProductPack: Query;
    SearchTaskProject: Query;
    MyCustomerIsOccupy: Query;
    Relation: Map;
    searchNewMyCustomer: Query;
    WebUserEmployeeMap: Map;
    Withdrawal: Sheet;
    WithdrawalStateBook: Book;
    SearchWithdrawalStateQuery: Query;
    SearchBalanceHistory: Query;
    WebUserAccountMap: Map;
    AddWebUserAccountMap: Action;
}

export interface UqMember {
    MemberAction: Action;
    MemberRecommender: Map;
}

export interface UQs {
    order: UqOrder;
    product: UqProduct;
    common: UqCommon;
    webuser: UqWebUser;
    customer: UqCustomer;
    customerDiscount: UqCustomerDiscount;
    promotion: UqPromotion;
    warehouse: UqWarehouse;
    salesTask: UqSalesTask;
    member: UqMember;
}
