import * as React from 'react';
import { VPage, Page, Form, Schema, UiSchema, Context, UiTextAreaItem } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { observer } from 'mobx-react';
import { Task } from '../model';
import { setting } from 'appConfig';


const schema: Schema = [
    { name: 'resulttype', type: 'id', required: false },
    { name: 'result', type: 'string', required: false },
];


export class VSalesTaskInvalid extends VPage<CSalesTask> {

    private form: Form;
    private task: Task;
    private uiSchema: UiSchema = {
        items: {
            resulttype: { visible: false },
            result: { widget: 'textarea', label: '原因', placeholder: '请输入取消原因！', rows: 12 } as UiTextAreaItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onInvalidTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { result, resulttype } = context.form.data;
        await this.controller.onInvalidTask(this.task, result, resulttype);
        this.closePage(2);
    }

    private page = observer((salestask: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onInvalidTask} >提交</button>;
        return <Page header="取消" footer={footer} headerClassName={setting.pageHeaderCss} >
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                />
            </div>
        </Page >
    })
}