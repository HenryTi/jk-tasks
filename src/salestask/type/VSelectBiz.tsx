import * as React from 'react';
import { VPage, Page, LMR, List, tv } from 'tonva';
import { CSelectBiz } from './CSelectBiz';
import { setting } from 'appConfig';

export class VSelectBiz extends VPage<CSelectBiz> {

    async open() {
        this.openPage(this.page);
    }

    private renderItem = (model: any, index: number) => {
        let { biz, type } = model;
        let left = <div className='text-info mr-3' >{tv(type, (obj) => this.controller.owner.getTaskIcon(biz.obj.name))}</div>
        return <LMR className="px-3 py-2" left={left}>
            <div className="font-weight-bold">{tv(biz, obj => obj.description)}</div>
        </LMR>
    }

    private onClickTaskBiz = async (model: any) => {
        await this.controller.selectTaskBiz(model);
        //this.ceasePage(1);
    }

    private page = () => {
        let { taskType, taskBizs } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">正在筹备中</div>;
        return <Page header={taskType.description || taskType.name} headerClassName={setting.pageHeaderCss} >
            <List none={none} items={taskBizs} item={{ render: this.renderItem, onClick: this.onClickTaskBiz }} />
        </Page>
    };
}