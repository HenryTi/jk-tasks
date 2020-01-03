import * as React from 'react';
import { VPage, Page, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../../model';
import { CCommonType } from './CCommonType';
import { setting } from 'appConfig';


export class VCreate extends VPage<CCommonType> {

    private task: Task;
    private form: Form;

    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { description, priorty, deadline } = context.form.data;
        this.task.description = description;
        this.task.priorty = priorty;
        this.task.deadline = deadline;
        await this.controller.cSalesTask.createTask(context.form.data, this.task);
        this.closePage(3);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    render(param: any) {
        let { schema, uiSchema } = this.controller.taskCommonType;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        return <Page header={this.controller.caption} footer={footer} headerClassName={setting.pageHeaderCss} >
            <div className="App-container container text-left">
                {this.controller.renderCreateTop(param)}
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
            </div>
        </Page >
    }
}
