import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, VPage, Page, EasyDate, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { tv } from 'tonva';
import classNames from 'classnames';
import { observable } from 'mobx';
import { CSelectType } from './CSelectType';
import { setting } from 'appConfig';

const cnRow = 'w-100 py-3';
const cnRowCustor = classNames(cnRow, 'cursor-pointer');

export class VAiDetail extends VPage<CSelectType> {

    @observable private task: any;

    async open(task: any) {
        this.task = task;
        this.openPage(this.page);
    }

    onCancel = () => {
        this.closePage();
    }

    onCreate = () => {
        this.controller.createTask(this.task);
        this.closePage(3);
    }

    private page = observer(() => {

        let { type, biz, customer, deadline, description } = this.task;

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'type',
                component: <LMR className={cnRowCustor}
                    left={<div className="mr-2 "> <FA name="bookmark-o" className="text-info mr-2 pt-1" /> </div>}>
                    <span className="font-weight-bold mr-3 my-3">{tv(type, v => <>{v.description}</>)} </span>  {tv(biz, v => <>{v.description}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className={cnRowCustor} onClick={null}
                    left={<div className="mr-2"> <FA name="user" className="text-info mr-2 pt-1" /> </div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
            } as ComponentProp,

        ];
        if (deadline) {
            rows.push({
                type: 'component',
                name: 'deadline',
                component: <LMR className={cnRow}
                    left={<div className="mr-2"> <FA name="clock-o" className="text-info mr-2 pt-1 " /> </div>}>
                    {<EasyDate date={deadline} />}
                </LMR>,
            } as ComponentProp);
        }
        if (description) {
            rows.push({
                type: 'component',
                name: 'description',
                component: <div className="w-100 py-3">{description}</div>,
            } as ComponentProp);
        }

        let left = <div className="flex-grow-1 align-self-center justify-content-start">
            <button type="button" className="btn btn-primary" onClick={this.onCreate} >&nbsp;添加&nbsp;</button>
        </div>;
        let rigth = <div>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" >撤销</button>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={this.onCancel} >取消</button>
        </div>;

        return <Page header="任务详细" headerClassName={setting.pageHeaderCss}>

            <PropGrid className="my-2" rows={rows} values={this.task} />
            <LMR className=" mx-3 " left={left} right={rigth}></LMR>
        </Page>
    })
}