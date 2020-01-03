import { Query, PageItems } from 'tonva';
import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { VCustomerUnitSelect } from './VCustomerUnitSelect';
import { VCreateCustomerUnit } from './VCreateCustomerUnit';
import { VCustomerUnitDetail } from './VCustomerUnitDetail';
/* eslint-disable */
//页面类
class PageUnit extends PageItems<any> {

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
export class CCustomerUnit extends CUqBase {
    //cApp: CApp;
    @observable pageUnit: PageUnit;

    //初始化
    protected async internalStart(type: any) {
        this.pageUnit = null;
        this.searchByKey('');
        this.openVPage(VCustomerUnitSelect, type);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageUnit = new PageUnit(this.uqs.salesTask.searchMyCustomerUnit);
        this.pageUnit.first({ key: key });
    }

    /**
     * 显示新建单位
     */
    showCreateOrganization = async (type: any) => {
        let orgnization = await this.vCall(VCreateCustomerUnit);
        if (type === 1) {
            this.showCreateCustomer(orgnization);
        } else {
            this.pageUnit = null;
            this.searchByKey('');
        }
    }

    //新建客户单位
    createOrganization = async (param: any) => {
        let par = {
            name: param.Name
        }
        let { MyCustomerUnit, CreateMyCustomerUnit } = this.uqs.salesTask;
        let organization = await CreateMyCustomerUnit.submit(par);
        let organizationBox = organization && MyCustomerUnit.boxId(organization.id);

        this.backPage();
        this.returnCall(organizationBox);
    }

    //显示单位明细
    showCustomerUnitDetail = async (param: any) => {
        let unit = await this.uqs.salesTask.MyCustomerUnit.load(param);
        this.openVPage(VCustomerUnitDetail, unit);
    }

    /**
     * 显示新建客户页面
     */
    showCreateCustomer = async (param: any) => {
        this.cApp.cCustomer.showCreateCustomer(param);
    }

    //显示单位明细
    showCustomerUnitEdit = async (param: any) => {
        let unit = await this.uqs.salesTask.MyCustomerUnit.load(param);
        this.openVPage(VCustomerUnitDetail, unit);
    }

    //修改单位信息
    updateMyCustomerUnit = async (param: any) => {
        await this.uqs.salesTask.MyCustomerUnit.save(param.id, param);
        this.closePage();
    }

    //选择客户--给调用页面返回客户id
    returnCustomerUnit = async (customerunit: any): Promise<any> => {
        this.returnCall(customerunit);
    }


}