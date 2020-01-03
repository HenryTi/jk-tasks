import { Query, PageItems } from 'tonva';
import { observable } from 'mobx';
import { CUqSub } from '../../CBase';
import { Task } from '../model';
import { CSalesTask } from '../CSalesTask';
import { VSelectType } from './VSelectType';
import { VAi } from './VAi';
import { VAiDetail } from './VAiDetail';

/* eslint-disable */
//页面类
class PageMyJKTask extends PageItems<any> {

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
export class CSelectType extends CUqSub {
    private taskBook: any;
    private tasks: [];
    private customerid: number;
    private task: Task;
    @observable tasktypelist: any;
    @observable pageMyJKTask: PageMyJKTask;
    @observable organization: any;

    //cApp: CApp;
    get owner(): CSalesTask { return this._owner as CSalesTask };

    /*
    cSalesTask: CSalesTask;
    private tuidTaskType: Tuid;
    private tuidOrganization: Tuid;
    private querySearchJKTask: Query;
    private querygetCustomerOrganization: Query;
    private actionImportTask: Action;

    //构造函数
    constructor(cSalesTask: CSalesTask, res: any) {
        super(res);
        this.cSalesTask = cSalesTask;
        this.pageMyJKTask = null;

        let { cUqSalesTask, cUqCustomer } = this.cSalesTask.cApp;
        this.tuidTaskType = cUqSalesTask.tuid("tasktype");
        this.tuidOrganization = cUqSalesTask.tuid("Organization");
        this.querySearchJKTask = cUqSalesTask.query("SearchJKTask");
        this.querygetCustomerOrganization = cUqCustomer.query("getCustomerOrganization");
        this.actionImportTask = cUqSalesTask.action("ImportTask");
    }
    */

    //初始化
    protected async internalStart(param: any) {
        this.pageMyJKTask = null;

        this.customerid = param;
        await this.searchByKey('');
        this.openVPage(VSelectType, param);
    }

    //搜索任务类型
    async searchByKey(key: string) {

        this.tasktypelist = await this.uqs.salesTask.TaskType.search(key, 0, 100);
    }

    //返回添加任务页面
    selectTaskType = async (type: any) => {
        this.task = {
            id: null,
            type: type,
            biz: null,
            description: null,
            remindDate: null,
            deadline: null,
            customer: null
        }
        this.owner.cSalesTaskBiz.start(this.task)
    }

    returnTaskType = async (type: any): Promise<any> => {
        this.returnCall(type);
    }

    aiClick = async () => {
        this.pageMyJKTask = new PageMyJKTask(this.uqs.salesTask.SearchJKTask);
        this.pageMyJKTask.first({ key: undefined });
        this.openVPage(VAi);
    }

    showJkTaskDetail = async (model: any) => {
        await this.searchCustomerRelation(model.customer.id);
        this.openVPage(VAiDetail, model);
    }

    createTask = async (model: any) => {
        let { id, customer } = model;
        let { name } = customer.obj;

        await this.uqs.salesTask.ImportTask.submit({ task: id, customername: name, organization: this.organization.id, organizationName: this.organization.name });
        await this.owner.searchTaskByKey(0);
    }

    searchCustomerRelation = async (param: any) => {
        let aa = { id: param };
        let relesions = await this.uqs.salesTask.getCustomerOrganization.query({ customerId: param })
        if (relesions && relesions.ret.length > 0) {
            let org = relesions.ret[0].organization;
            this.organization = await this.uqs.salesTask.Organization.load(org);
        }
    }

}
