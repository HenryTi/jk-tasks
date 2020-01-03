import * as React from 'react';
import { Controller, Page } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { VDetailTop } from './share/VDetailTop';
import { VCreateTop } from './share/VCreateTop';
import { VActionsBottom } from './share/VActionsBottom';
import { Task } from '../model';
import { VDetailContent } from './share/VDetailContent';
import { VFinish } from './commonType/VFinish';
import { setting } from 'appConfig';

export abstract class CType extends Controller {
    caption: string;
    cSalesTask: CSalesTask;
    icon: any = 'plus';

    //显示任务明细--无操作
    async showDetailFromId(taskid: number): Promise<void> {
        let task = await this.cSalesTask.loadTask(taskid);
        this.openPage(
            this.renderDetailValues(task)
        );
    }

    private renderDetailValues = (task: Task): JSX.Element => {
        let { caption, renderDetailTop, renderDetailContent } = this;
        return <Page header={caption} headerClassName={setting.pageHeaderCss} >
            {renderDetailTop(task)}
            {renderDetailContent(task)}
        </Page >
    }

    //显示任务明细--有操作
    async showDetailEdit(task: Task): Promise<void> {
        let tasks = await this.cSalesTask.loadTask(task.id);
        task.fields = tasks.fields
        this.openPage(
            this.renderDetailEdit(task)
        );
    }

    private renderDetailEdit = (task: Task): JSX.Element => {
        let { caption, renderDetailTop, renderActionsBottom, renderDetailContent } = this;
        return <Page header={caption} headerClassName={setting.pageHeaderCss} footer={renderActionsBottom(task)}>
            {renderDetailTop(task)}
            {renderDetailContent(task)}

        </Page >
    }

    protected renderDetailTop = (task: Task): JSX.Element => {
        return this.renderView(VDetailTop, task);
    }

    protected renderDetailContent = (task: Task): JSX.Element => {
        return this.renderView(VDetailContent, task);
    }

    protected renderActionsBottom = (task: Task): JSX.Element => {
        return this.renderView(VActionsBottom, task);
    }

    //完结任务
    async showComplet(task: Task): Promise<void> {
        let tasks = await this.cSalesTask.loadTask(task.id);
        this.openPage(
            this.renderComplet(tasks)
        );
    }

    private renderComplet = (task: Task): JSX.Element => {
        let { caption } = this;
        return <Page header={caption} headerClassName={setting.pageHeaderCss} >
            {this.renderCompletContent(task)}
        </Page >
    }

    private renderCompletContent = (task: Task): JSX.Element => {
        return this.renderView(VFinish as any, task);
    }


    //创建任务
    async showCreate(task: Task): Promise<void> {
        await task.biz.assure();
        this.openPage(<Page header={"biz.name"}>没有继承showCreate！</Page>);
    }

    renderCreateTop = (task: Task): JSX.Element => {
        return this.renderView(VCreateTop, task);
    }
}
