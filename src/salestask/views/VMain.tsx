import * as React from 'react';
import classNames from 'classnames';
import { VPage, Page, PageItems, Image } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { List, LMR, EasyDate, FA } from 'tonva';
import { observer } from 'mobx-react';
import { tv } from 'tonva';

export class VMain extends VPage<CSalesTask> {

    private tasklist: any;
    async open(param: any) {

    }

    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onScrollBottom = async () => {
    }

    //选择任务
    private onSalesTaskClick = async (task: any) => {
        this.controller.showTaskDetailEdit(task);
    }

    //添加任务
    private onSalesTaskAdd = async () => {
        await this.controller.createTask();
    }

    private renderSalesTask = (salesTask: any, index: number) => {

        let { description, deadline, createTime, customer, type, typeName, priorty } = salesTask;
        let cnFlag = classNames({
            'my-1 mr-3': true,
            'text-danger': priorty > 0,
            'text-info': !(priorty > 0)
        })

        let left = <div className={cnFlag}>{this.controller.taskIcon(typeName)}</div>;
        let right = <div className="text-right">
            {deadline && <small className="text-muted">时限：<EasyDate date={deadline} /></small>}
        </div>
        return <LMR className="px-3 py-2" left={left}>
            <LMR className="" right={right}>
                <div className="font-weight-bold">{tv(customer, (v) => <>{v.name}</>)}</div>
            </LMR>
            <div className="text-muted">{tv(type, (v) => <>{v.name}</>)}</div>
        </LMR>
    }

    private page = observer(() => {

        let { tasks } = this.controller;
        if (tasks === undefined) return null;

        let none = <div className="my-3 mx-2 text-muted">无任务</div>;
        let add = <div onClick={this.onSalesTaskAdd} className="cursor-pointer px-3"><FA name="plus" /></div>;

        let item = { render: this.renderSalesTask, onClick: this.onSalesTaskClick };
        let { tasksNow, dateTasksList } = tasks;
        return <Page header="销售助手" onScrollBottom={this.onScrollBottom} right={add} headerClassName="bg-primary py-1">
            {tasksNow.length > 0 && <List before={''} none={none} items={tasksNow} item={item} />}
            {
                dateTasksList.map((v, index: number) => {
                    let { date, list } = v;
                    if (list.length === 0) return null;
                    return <React.Fragment key={index}>
                        <div className="small text-muted pt-3 px-3 pb-2 text-center"><EasyDate date={date} /></div>
                        <List before={''} none={none} items={list} item={item} />
                    </React.Fragment>;
                })
            }
        </Page>
    });

}
