import * as React from 'react';
import { VPage, Page, tv, UserIcon } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate } from 'tonva';
import { setting } from 'appConfig';


export class VMyCustomer extends VPage<CCustomer> {

    private temp: any;
    async open(temp: any) {
        this.temp = temp;
        this.openPage(this.page);
    }

    private renderCustomer = (customer: any, index: number) => {
        //(customer as any)._source = 'VCustomerList';
        let { name, unit, validity, webuser } = customer;
        let { showCustomerDetail } = this.controller

        let nameShow = <div className="cursor-pointer font-weight-bold w-100">{name}</div>;
        let unitShow = <div className=" cursor-pointer text-muted"><small> {tv(unit, s => s.name)}</small></div>;
        let date = <div className=" cursor-pointer small"><EasyDate date={validity} /></div>
        let webuserid = webuser ? webuser.id : 47;

        return <LMR onClick={() => showCustomerDetail(customer)} className="px-2 py-1" left={<UserIcon className="mt-1 mx-2 w-3c h-3c" id={webuserid} style={{ borderRadius: '8px' }} />} >
            <LMR className="px-1 pt-2" left={nameShow} ></LMR>
            <LMR className="px-1" left={unitShow} right={date}></LMR>
        </LMR>
    }

    private page = observer(() => {
        let { pageMyCustomerActive } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        var header = <>客户</>;
        if (this.temp === 2) {
            header = <>活跃客户</>;
        }
        return <Page header={header} headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageMyCustomerActive} item={{ render: this.renderCustomer }} />
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageMyCustomerActive.more();
    }
}