import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page } from 'tonva';
import { LMR, List, SearchBox, FA } from 'tonva';
import { CCustomerUnit } from './CCustomerUnit';
import { setting } from 'appConfig';


export class VCustomerUnitSelect extends VPage<CCustomerUnit> {

    private type: any; // 显示类型:1.新建客户时的查询单位；2.按单位搜索客户时的查询单位

    async open(param: any) {
        this.type = param;
        this.openPage(this.page);
    }

    private renderItem(salesTask: any, index: number) {
        let { name } = salesTask;
        return <LMR className="px-3 py-1" left={<FA name='university' className='my-2 mr-3 text-info' />}>
            <div className="font-weight-bold my-1">{name}</div>
        </LMR >
    }

    private onClickRow = async (model: any) => {
        if (this.type === 1) {
            await this.controller.showCreateCustomer(model.id);
        } else if (this.type === 2) {
            await this.controller.returnCustomerUnit(model);
        }
    }

    private page = observer(() => {
        let { pageUnit, showCreateOrganization } = this.controller;
        let onshowCreateUnit = async () => await showCreateOrganization(this.type);

        let none, text, right;
        if (this.type === 1 || this.type === 2) {
            none = <div className="my-3 mx-2 text-warning">
                还没有创建过客户单位，请先<span className="text-primary" onClick={onshowCreateUnit}>创建单位！</span>
            </div>;
            text = <div className="my-3 mx-2 text-warning">新建客户前先选择单位，或点击右上角加号新建单位！</div>;
            right = <div onClick={onshowCreateUnit} className="cursor-pointer px-3"><span className="iconfont icon-tianjia" style={{ fontSize: "20px", color: "#ffffff" }}></span></div>;
        } else {
            text = "";
            none = <div className="my-3 mx-2 text-warning">你还没有创建单位，无法根据单位搜索！</div>;
        }
        return <Page header="选择单位" onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} right={right}>
            <SearchBox className="px-1 w-100 mt-2 mr-2"
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索单位" />
            <List before={''} none={none} className="mt-2" items={pageUnit}
                item={{ render: this.renderItem, onClick: this.onClickRow }} />
            {(!pageUnit) && text}
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageUnit.more();
    }
}