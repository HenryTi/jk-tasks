import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';

export class VCustomerHistory extends VPage<CSalesTask> {

    private tasks: any;
    async open(tasks: any) {
        this.tasks = tasks;
        this.openPage(this.page);
    }

    private renderHistory = (taskhistory: any, index: number) => {
        let { task, date, status } = taskhistory;
        return <div className="d-block p-3">
            <LMR className='small' left={<small className="text-muted"><EasyDate date={date} /></small>}
                right={<small>{tv(status, (v) => v.name)}</small>}>
            </LMR>
            <LMR left={<small>{tv(task, v => tv(v.biz, vs => vs.description))}</small>}
                right={<small>{tv(task, v => tv(v.type, vs => vs.description))}</small>}></LMR>
        </div >;
    }

    //选择任务
    private onSalesTaskClick = async (param: any) => {
        this.controller.showTaskDetailEdit(param.task.obj);
    }

    private page = observer(() => {

        let none = <div className="m-3 text-muted small">【无记录】</div>;
        return <Page header="沟通记录" headerClassName={setting.pageHeaderCss}>
            <List before={''} none={none} items={this.tasks} item={{ render: this.renderHistory, onClick: this.onSalesTaskClick }} />
        </Page>
    })
}