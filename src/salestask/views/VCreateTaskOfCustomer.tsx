import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../model';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';

export class VCreateTaskOfCustomer extends VPage<CSalesTask> {

    private task: Task;
    private form: Form;
    private saveType: any = 1;
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
        this.saveType = 1;
    }

    private onCreateAndFinishTask = async (model: any) => {
        if (!this.form) return;
        this.saveType = 0;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {

        let { priorty, deadline, description } = context.form.data;
        this.task.priorty = priorty;
        this.task.deadline = deadline;
        this.task.description = description;
        if (this.saveType === 1) {
            await this.controller.createTask(context.form.data, this.task);
            this.closePage();
        } else {
            await this.controller.createAndFinishTask(this.task);
        }
    }

    private uiSchema: UiSchema = {
        items: {
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' } as UiInputItem,
            description: { widget: 'textarea', label: '任务描述', placeholder: '请填写任务描述', rows: 6 } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'deadline', type: 'date', required: true },
        { name: 'description', type: 'string', required: true },
    ];

    private page = observer(() => {

        return <Page header="添加任务" headerClassName={setting.pageHeaderCss} >
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
                <div className="d-flex px-1 ">
                    <div className="flex-grow-1 justify-content-start">
                    </div>
                    <button type="button" className="btn btn-outline-info ml-2" onClick={this.onCreateAndFinishTask} >处理任务</button>
                    <button type="button" className="btn btn-primary mx-2" onClick={this.onAddSalesTask} >新建任务</button>
                </div>
            </div>
        </Page >
    });
}