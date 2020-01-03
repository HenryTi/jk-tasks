import * as React from 'react';
import { VPage, Page, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { setting } from 'appConfig';


export class VCustomerRelation extends VPage<CCustomer> {

    private model: any;
    async open(model: any) {
        this.model = model;
        this.openPage(this.page);
    }

    private onRelationCustomer = async () => {
        let { onRelationCustomer } = this.controller;
        await onRelationCustomer(this.model);
        this.closePage(1);
    }

    private onshowCreateNewCustomer = async () => {
        let { showCreateNewCustomer } = this.controller;
        await showCreateNewCustomer(this.model);
    }

    private page = observer(() => {
        let { webuser } = this.model;
        let { name } = webuser.obj;
        let footer = <div className="d-flex px-1">
            <div className="flex-grow-1 align-self-center justify-content-end">
                <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={this.onRelationCustomer}>关联客户</button>
                <button type="button" className="btn btn-primary ml-2 align-self-center" onClick={this.onshowCreateNewCustomer} >新建客户</button>
            </div>
        </div>;;
        return <Page header="新客户" headerClassName={setting.pageHeaderCss} footer={footer} >
            <LMR className="cursor-pointer w-100 py-3 px-3" left="账户" right={name}></LMR>
        </Page>
    })
}