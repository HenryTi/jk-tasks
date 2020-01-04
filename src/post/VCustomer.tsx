import * as React from 'react';
import { VPage, Page, LMR, List, tv, EasyDate, UserIcon } from 'tonva';
import { observer } from 'mobx-react';
import { CPost } from './CPost';
import { setting } from 'appConfig';

export class VCustomer extends VPage<CPost> {

    async open() {
        this.openPage(this.page);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private imgSmile = <div className="mt-1 mx-2 w-3c h-3c p-1"><img className="w-100 h-100" alt="" /></div>;
    private renderCustomer = (customer: any, index: number) => {
        (customer as any)._source = 'VCustomerList';

        let { name, unit, validity, webuser } = customer;
        let nameShow = <div className="cursor-pointer font-weight-bold w-100">{name}</div>;
        let unitShow = <div className=" cursor-pointer text-muted"><small> {tv(unit, s => s.name)}</small></div>;
        let date = <div className=" cursor-pointer small"><EasyDate date={validity} /></div>
        let left = webuser ?
            <UserIcon className="mt-1 mx-2 w-3c h-3c" id={webuser.id} style={{ borderRadius: '8px' }} />
            :
            this.imgSmile;
        return <LMR className="px-2 py-1" left={left} >
            <LMR className="px-1 pt-2" left={nameShow} ></LMR>
            <LMR className="px-1" left={unitShow} right={date}></LMR>
        </LMR>
    }

    private page = observer(() => {
        let { pageCustomer } = this.controller;
        return <Page header="客户" onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} >
            <List before={''} none="【无】" items={pageCustomer} item={{ render: this.renderCustomer }} />
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageCustomer.more();
    }
}