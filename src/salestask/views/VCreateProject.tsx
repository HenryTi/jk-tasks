import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import { CreateProduct, Task } from '../model';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';


const schema: Schema = [
    { name: 'note', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VCreateProject extends VPage<CSalesTask> {

    private uiSchema: UiSchema = {
        items: {
            note: { widget: 'textarea', label: '备注', placeholder: '' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    private form: Form;
    private task: Task;
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    private onCreateTaskProject = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.createTaskProject(this.task, context.data.note);
        this.closePage();
    }

    render(param: CreateProduct) {
        return <Page header="添加项目" footer={null} headerClassName={setting.pageHeaderCss}>
            <div className="mx-3">
                <Form ref={v => this.form = v}
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
                <button type="button" className="btn btn-primary w-100" onClick={this.onCreateTaskProject} >添加</button>
            </div>
        </Page >
    }
}