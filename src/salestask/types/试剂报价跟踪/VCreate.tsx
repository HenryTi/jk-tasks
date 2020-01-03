import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiCheckItem } from 'tonva';
import { observer } from 'mobx-react';
import { UiSchema, UiInputItem } from 'tonva';
import { setting } from 'appConfig';
import { CType } from '../CType';
import { Task } from '../../model';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'customer', type: 'id', required: false },
    { name: 'type', type: 'id', required: false },
    { name: 'description', type: 'string', required: false },
    { name: 'priorty', type: 'number', required: false },
    { name: 'deadline', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VCreate extends VPage<CType> {
    private task: Task;
    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            customer: { visible: false },
            type: { visible: false },
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }

    async open(salestask: any) {
        this.task = salestask;
        this.openPage(this.page, salestask);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.cSalesTask.createTask(context.form.data, this.task);
        this.closePage(1);
    }

    private page = observer((param: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        return <Page header={this.controller.caption} footer={footer} headerClassName={setting.pageHeaderCss}  >
            <div className="App-container container text-left">
                {this.controller.renderCreateTop(param)}
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
            </div>
        </Page >
    })
}