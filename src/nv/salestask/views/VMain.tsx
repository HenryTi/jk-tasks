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
    private onSalesTaskClick = async (param: any) => {
        let task = {
            id: param.id,
            type: param.type,
            biz: param.biz,
            description: param.description,
            remindDate: null,
            deadline: param.deadline,
            customer: param.customer
        }
        this.controller.showTaskDetailEdit(task);
    }

    //添加任务
    private onSalesTaskAdd = async () => {
        await this.controller.showSelectTaskType();
    }

    private renderSalesTask = (salesTask: any, index: number) => {

        let { bizName, deadline, biz, customer, type, typeName, priorty, description } = salesTask;
        let cnFlag = classNames({
            'my-1 mr-3': true,
            'text-danger': priorty > 0,
            'text-info': !(priorty > 0)
        })

        let left = <div className={cnFlag}>{this.controller.getTaskIcon(bizName)}</div>;
        let right = <div className="text-right"> {tv(customer, (v) => <>{tv(v.unit)}</>)} </div>
        return <LMR className="px-3 py-3" left={left}>
            <LMR className="" right={right}>
                <div className=" my-1 mr-3 font-weight-bold">{tv(customer)}</div>
            </LMR>
            <LMR className="" >
                <div className=" my-1 mr-3">{description}</div>
            </LMR>
        </LMR >
    }

    private page = observer(() => {

        let { tasks } = this.controller;
        if (tasks === undefined) return null;

        let none = <div className="my-3 mx-2" style={{ color: '#888' }}>无任务</div>;
        let right = <div onClick={this.onSalesTaskAdd} className="cursor-pointer px-3 py-2"><FA name="plus" /></div>;
        let item = { render: this.renderSalesTask, onClick: this.onSalesTaskClick };
        let { tasksNow, dateTasksList } = tasks;

        return <Page header="任务" onScrollBottom={this.onScrollBottom} right={right} headerClassName="bg-primary pl-3">
            {tasksNow.length == 0 && dateTasksList.length == 0 && none}
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