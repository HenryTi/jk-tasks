import * as React from 'react';
import { VPage, Page, LMR, List, tv, EasyDate, UserIcon } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { setting } from 'appConfig';
import smile from '../images/smile-face.jpg';

export class VCustomerList extends VPage<CCustomer> {

    async open() {
        this.openPage(this.page);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private imgSmile = <div className="mt-1 mx-2 w-3c h-3c p-1"><img className="w-100 h-100" src={smile} alt="" /></div>;
    private renderCustomer = (customer: any, index: number) => {
        (customer as any)._source = 'VCustomerList';
        let onClickCustomer = () => this.controller.showCustomerDetail(customer);

        let { name, unit, validity, webuser } = customer;
        let nameShow = <div className="cursor-pointer font-weight-bold w-100">{name}</div>;
        let unitShow = <div className=" cursor-pointer text-muted"><small> {tv(unit, s => s.name)}</small></div>;
        let date = <div className=" cursor-pointer small"><EasyDate date={validity} /></div>
        let left = webuser ?
            <UserIcon className="mt-1 mx-2 w-3c h-3c" id={webuser.id} style={{ borderRadius: '8px' }} />
            :
            this.imgSmile;
        return <LMR onClick={onClickCustomer} className="px-2 py-1" left={left} >
            <LMR className="px-1 pt-2" left={nameShow} ></LMR>
            <LMR className="px-1" left={unitShow} right={date}></LMR>
        </LMR>
    }

    private renderNewCustomer = (model: any, index: number) => {
        let { showNewMyCustomerDetil } = this.controller;
        let onClik = () => showNewMyCustomerDetil(model);
        let { customer } = model;
        let left: any = <div>{tv(customer, v => v.name)}</div>;
        return <LMR className="pl-2 pr-3 py-1" left={<UserIcon className="mt-1 mx-2 w-2c h-2c" id={47} style={{ borderRadius: '8px' }} />} onClick={onClik}>
            <LMR className="py-2" left={left} right={<div className="small text-warning">新客户</div>}>
            </LMR>
        </LMR >
    }

    private page = observer(() => {
        let { pageCustomer, showSelectOrganization, showCustomerSearch, newMyCustomerList } = this.controller;
        let onShowSelectOrganzation = () => showSelectOrganization(1);
        let onshowCustomerSearch = () => showCustomerSearch(null);
        let right = <div className="cursor-pointer py-1">
            <span onClick={onshowCustomerSearch} className="iconfont icon-icon-chaxun mx-2" style={{ fontSize: "20px", color: "#ffffff" }}></span>
            <span onClick={onShowSelectOrganzation} className="iconfont icon-tianjia mx-3" style={{ fontSize: "20px", color: "#ffffff" }}></span>
        </div>;
        let none = <div className="my-3 mx-2 text-warning"></div>;
        return <Page header="客户" onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} right={right} >

            {newMyCustomerList && newMyCustomerList.length > 0 && <List className="py-2" before={''} none={none} items={newMyCustomerList} item={{ render: this.renderNewCustomer }} />}
            {
                pageCustomer && pageCustomer.items && (pageCustomer.items.length > 0) &&
                <List before={''} none={none} items={pageCustomer} item={{ render: this.renderCustomer }} />
            }
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageCustomer.more();
    }
}