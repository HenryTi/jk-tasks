import * as React from 'react';
import classNames from 'classnames';
import { VPage, Page, tv, LMR, List, EasyDate } from 'tonva';
import { observer } from 'mobx-react';
import { CSelectType } from './CSelectType';
import { observable } from 'mobx';
import { setting } from 'appConfig';

export class VAi extends VPage<CSelectType> {

    @observable private finished: boolean;
    async open(param: any) {
        this.openPage(this.page);
    }

    private renderItem = (salesTask: any, index: number) => {


        let { deadline, biz, customer, type, priorty } = salesTask;
        let cnFlag = classNames({
            'my-1 mr-3': true,
            'text-danger': priorty > 0,
            'text-info': !(priorty > 0)
        })

        let left = <div className={cnFlag}>{}</div>;
        let right = <div className="text-right">
            {deadline && <small className="text-muted">时限：<EasyDate date={deadline} /></small>}
        </div>
        return <LMR className="px-3 py-2" left={left}>
            <LMR className="" right={right}>
                <div className="font-weight-bold">{tv(customer, (v) => <>{v.name}</>)}</div>
            </LMR>
            <LMR className="" right={<div className="text-muted"><small>{tv(type, (v) => <>{v.description}</>)}</small></div>}>
                <div className="text-muted" ><small>{tv(biz, (v) => <>{v.description}</>)}</small></div>
            </LMR>
        </LMR>
    }

    private onClickJKTask = async (model: any) => {
        await this.controller.showJkTaskDetail(model);
    }

    private page = observer(() => {

        let { pageMyJKTask } = this.controller;

        let none = <div className="my-3 mx-2 text-warning">正在筹备中</div>;
        return <Page header="AI" headerClassName={setting.pageHeaderCss}>
            <List none={none} items={pageMyJKTask} item={{ render: this.renderItem, onClick: this.onClickJKTask }} />
        </Page>;
    })
}