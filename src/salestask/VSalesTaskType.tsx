import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CSalesTaskType } from './CSalesTaskType';
import { LMR, List } from 'tonva-react-form';

export class VSalesTaskType extends VPage<CSalesTaskType> {

    async open(salestask: any) {

        this.openPage(this.page, salestask);
    }

    private renderList(model: any, index: number) {

        let { description, name } = model;
        let right = <small className="text-muted">{description}</small>;
        return <LMR className="px-3 py-2" right={right} >
            <div className="font-weight-bold">{name}</div>
        </LMR>
    }

    private page = observer((product: any) => {

        let { tasktypelist, showSalesTaskAdd } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关产品，请重新搜索！</div>;
        return <Page header="选择任务类型" >
            <List before={''} none={none} items={tasktypelist} item={{ render: this.renderList, onClick: showSalesTaskAdd }} />
        </Page>
    })
}