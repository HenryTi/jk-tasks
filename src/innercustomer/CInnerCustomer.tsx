import { Query, PageItems } from 'tonva';
import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { Task } from '../salestask/model';
import { VInnerCustomerCall } from './VInnerCustomerCall';

//页面类
class PageCWebUser extends PageItems<any> {

    private searchQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

/**
 *
 */
export class CInnerCustomer extends CUqBase {
    @observable pageWebUser: PageCWebUser;

    /*
    private querySearchWebUser: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCustomer } = this.cApp;
        this.querySearchWebUser = cUqCustomer.query("searchCustomer");

    }
    */

    //初始化
    protected async internalStart(task: Task) {
        this.pageWebUser = null;
        this.openVPage(VInnerCustomerCall);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageWebUser = new PageCWebUser(this.uqs.customer.SearchWebUser);
        this.pageWebUser.first({ key: key });
    }

    returnWebUser = async (webuser: any): Promise<any> => {
        this.returnCall(webuser);
    }



}
