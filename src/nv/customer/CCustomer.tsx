import * as React from 'react';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PageItems, Controller, Query, Tuid, Action, Map, Context } from 'tonva';
import { CApp } from '../CApp';
import { CUqBase } from '../CBase';
import { Task } from '../salestask/model';
import { CAddress } from '../address/CAddress';
import { VCustomerUnitSelect } from '../customerunit/VCustomerUnitSelect';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { VCustomerList } from './VCustomerList';
import { VCreateCustomer } from './VCreateCustomer';
import { VCreateCustomerFinish } from './VCreateCustomerFinish';
import { VMyCustomerSelectCall } from './VMyCustomerSelectCall--delete';
import { VCustomerSearch } from './VCustomerSearch';

//页面类
class PageMyCustomer extends PageItems<any> {

    private searchCustomerQuery: Query;

    constructor(searchCustomerQuery: Query) {
        super();
        this.firstSize = this.pageSize = 11;
        this.searchCustomerQuery = searchCustomerQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchCustomerQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}


class PageMyCustomerCearch extends PageItems<any> {

    private searchCustomerQuery: Query;

    constructor(searchCustomerQuery: Query) {
        super();
        this.firstSize = this.pageSize = 11;
        this.searchCustomerQuery = searchCustomerQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchCustomerQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}


/**
 *
 */
export class CCustomer extends CUqBase {
    cApp: CApp;

    @observable pageCustomer: PageMyCustomer;
    @observable pageCustomerSearch: PageMyCustomerCearch;
    @observable innerCustomer: any;
    private task: Task;

    /*
    private tuidMyCustomer: Tuid;
    private querySearchMyCustomer: Query;
    private querysearchCustomerMyCustomerMap: Query;
    private actionCreateMyCustomer: Action;
    private actionUpateCustomerMyCustomerMap: Action;

    private mapCustomerMyCustomerMap: Map;
    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqSalesTask } = this.cApp;

        this.tuidMyCustomer = cUqSalesTask.tuid("mycustomer");
        this.querySearchMyCustomer = cUqSalesTask.query("searchmycustomer");
        this.actionCreateMyCustomer = cUqSalesTask.action("CreateMyCustomer");
        this.mapCustomerMyCustomerMap = cUqSalesTask.map("CustomerMyCustomerMap");
        this.actionUpateCustomerMyCustomerMap = cUqSalesTask.action("UpateCustomerMyCustomerMap");
        this.querysearchCustomerMyCustomerMap = cUqSalesTask.query("searchCustomerMyCustomerMap");

    }
    */

    //初始化
    protected async internalStart(task: Task) {
        this.pageCustomer = null;
        this.task = task;
        this.searchByKey('');
        this.openVPage(VMyCustomerSelectCall);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageCustomer = new PageMyCustomer(this.uqs.salesTask.searchMyCustomer);
        this.pageCustomer.first({ key: key });
    }

    //查询客户--通过名称
    searchCustomerByKey = async (key: string) => {
        this.pageCustomerSearch = new PageMyCustomerCearch(this.uqs.salesTask.searchMyCustomer);
        this.pageCustomerSearch.first({ key: key });
    }

    //加载客户明细
    loadCustomerDetail = async (customerid: number) => {
        return await this.uqs.salesTask.MyCustomer.load(customerid);
    }

    //查询客户--通过ID
    showCustomerDetail = async (customerid: number) => {
        let mycustomer = await this.loadCustomerDetail(customerid);
        let customer = await this.uqs.salesTask.CustomerMyCustomerMap.query({ mycustomer: mycustomer.id });
        if (customer.ret.length > 0) {
            this.innerCustomer = customer.ret[0].customer;
        } else {
            this.innerCustomer = null;
        }
        this.openVPage(VCustomerDetail, mycustomer);
    }

    showSelectCustomer = async (task: Task) => {
        this.searchByKey('');
        this.task = task;
        this.openVPage(VCustomerSelect);
    }

    showCustomerSearch = async (val: any): Promise<any> => {
        if (val == null) {
            this.pageCustomerSearch = null;
        } else {
            this.searchCustomerByKey(val);
        }
        this.openVPage(VCustomerSearch);
    }

    //选择客户--给调用页面返回客户id
    selectCustomer = async (customer: any): Promise<any> => {
        this.task.customer = customer;
        this.cApp.cSalesTask.showCrateCheck(this.task);
    }

    //选择客户--给调用页面返回客户id
    returnCustomer = async (customer: any): Promise<any> => {
        this.returnCall(customer);
    }

    //显示新建客户页面
    showCreateCustomer = (param: any) => {
        this.openVPage(VCreateCustomer, param);
    }

    //显示选择客户的页面
    showSelectCustomerUnit = () => {
        this.cApp.cCustomerUnit.start();
    }

    //新建客户
    createMyCustomer = async (param: any, customerunit: any) => {
        let par = {
            unit: customerunit.id,
            no: undefined,
            name: param.Name,
            firstName: "",
            lastName: "",
            telephone: param.telephone,
            gender: param.Gender ? 1 : param.Gender,
            salutation: param.Salutation,
            birthDay: param.BirthDay
        }
        let ret = await this.uqs.salesTask.CreateMyCustomer.submit(par);
        let { code } = ret;
        this.openVPage(VCreateCustomerFinish, code);
    }

    //修改单位信息
    updateMyCustomer = async (param: any) => {
        await this.uqs.salesTask.MyCustomer.save(param.id, param);
    }

    showInnerCustomerSelect = async (mycustomer: any) => {
        let { cWebUser } = this.cApp;
        this.innerCustomer = await cWebUser.call();
        await this.createWebUserMyCustomerMap(this.innerCustomer.id, mycustomer);
    }

    createWebUserMyCustomerMap = async (customer: any, mycustomer: any) => {
        await this.uqs.salesTask.UpateCustomerMyCustomerMap.submit({ mycustomer: mycustomer, customer: customer });
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress);
        return await cAddress.call<number>();
    }

    render = observer(() => {
        return this.renderView(VCustomerList);
    })

    tab = () => {
        this.searchByKey('');
        return <this.render />;
    }
}