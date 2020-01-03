import * as React from 'react';
import { VPage, Page, Form, UiSchema, UiTextAreaItem, Context, UiCustom, Schema, Widget } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { observer } from 'mobx-react';
import { Task } from '../model';
import { observable } from 'mobx';
import { setting } from 'appConfig';


/* eslint-disable */
const schema: Schema = [
    { name: 'resulttype', type: 'string', required: false },
    { name: 'date', type: 'string', required: true },
    { name: 'result', type: 'string', required: false },
];

class SomeDay extends Widget {
    @observable dateVisible = false;
    private list = [{ value: 1, title: '明天' }, { value: 2, title: '后天' }];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.dateVisible = val === '0';
        var day2 = new Date();
        if (val === '1') {
            day2.setDate(day2.getDate() + 1);
            let ss = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
            this.setValue(ss);
        } else if (val === '2') {
            day2.setDate(day2.getDate() + 2);
            let ss = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
            this.setValue(ss);
        }
    }

    private onDateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setValue(evt.currentTarget.value);
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                return <label className="my-1"><input type="radio" value={v.value} name="a" onChange={this.onChange} /> {v.title} &nbsp; </label>
            })}
            <div>
                <label className="my-1"><input type="radio" value={0} name="a" onChange={this.onChange} /> 日期 &nbsp; </label>
                {this.dateVisible && <input type="date" defaultValue={(new Date).toDateString()} onChange={this.onDateChange} />}
            </div>
        </div>
    };
}


export class VSalesTaskExtension extends VPage<CSalesTask> {

    private form: Form;
    private task: Task;
    private uiSchema: UiSchema = {
        items: {
            resulttype: { visible: false },
            date: {
                widget: 'custom',
                label: '提醒日期',
                WidgetClass: SomeDay,
            } as UiCustom,
            result: { widget: 'textarea', label: '备注', placeholder: '请输入处理结果！', rows: 12 } as UiTextAreaItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }


    private onExtensionTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { result, resulttype, date } = context.form.data;
        await this.controller.extensionTask(this.task, result, resulttype, date);
        this.closePage(2);
    }

    private page = observer((product: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onExtensionTask} >提交</button>;
        return <Page header="延迟" footer={footer} headerClassName={setting.pageHeaderCss} >
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
/* eslint-enable */
