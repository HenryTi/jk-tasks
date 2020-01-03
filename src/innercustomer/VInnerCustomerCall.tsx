import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, SearchBox, FA } from 'tonva';
import { CInnerCustomer } from './CInnerCustomer';
import { setting } from 'appConfig';


export class VInnerCustomerCall extends VPage<CInnerCustomer> {

    async open(customer: any) {
        this.openPage(this.page, customer);
    }

    private renderCustomer(model: any, index: number) {
        let { name } = model;
        return <LMR className="px-3 py-2 " left={<FA name='user' className=' my-2 mr-3 text-info' />}>
            <div className="font-weight-bold"></div>
            <div>{name}</div>
        </LMR >
    }

    private onClickCustomer = async (model: any) => {
        await this.controller.returnWebUser(model);
        this.closePage();
    }

    private page = observer((customer: any) => {
        let { pageWebUser } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">请搜索客户！</div>;
        return <Page header="选择内部客户" headerClassName={setting.pageHeaderCss}>
            <SearchBox className="px-1 w-100  mt-2 mr-2"
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索客户姓名、单位" />
            <List before={''} none={none} items={pageWebUser} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })
}