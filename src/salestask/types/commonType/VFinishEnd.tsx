import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../../model';
import { CCommonType } from './CCommonType';
import { setting } from 'appConfig';

export class VCreateEnd extends VPage<CCommonType> {

    private task: Task;
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onAddSalesTask = async (model: any) => {
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    render(param: any) {
        let { schema, uiSchema } = this.controller.taskCommonType;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        return <Page header={this.controller.caption} footer={footer} headerClassName={setting.pageHeaderCss}>
            <div>任务已完结，5秒内返回主页面</div>
            <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>返回</button>
        </Page >
    }
}
