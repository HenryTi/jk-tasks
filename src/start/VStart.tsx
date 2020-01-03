import * as React from 'react';
import { VPage, Page, Form, UiSchema, UiInputItem, Schema, Context, Image } from 'tonva';
import { observer } from 'mobx-react';
import { CStart } from './CStart';
import { setting } from 'appConfig';

const schema: Schema = [
    { name: 'invitacode', type: 'number', required: true },
    { name: 'submit', type: 'submit' },
];

export class VStart extends VPage<CStart> {

    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            invitacode: { widget: 'text', label: ' ', placeholder: '请输入邀请码' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },
        }
    }

    async open(position: any) {
        this.openPage(this.page, position);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onCreatePosition = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.createPosition(context.form.data);

    }

    private onEnter = async (name: string, context: Context): Promise<any> => {
        if (name === 'invitacode') {
            await this.onCreatePosition();
        }
    }

    private page = observer((position: any) => {

        return <Page header={setting.sales.appName} headerClassName={setting.pageHeaderCss} logout={true}>
            <div className="text-center  bg-white" style={{ width: 'auto', height: '100%', padding: '1rem 0 0 0' }}  >
                <div className="pt-4">
                    <div className="h4 text-info">
                        欢迎加入{setting.sales.appName}
                    </div>
                    <div className="text-muted">超越自我，实现共赢</div>
                </div>
                <Image src={setting.sales.logo} className="mt-4" style={{ width: 'auto', height: '30%', margin: '0 auto 0 auto' }} />
                <div style={{ height: 'auto', margin: 'auto 5rem auto 5rem' }} >
                    <Form ref={v => this.form = v} className="m-3"
                        schema={schema}
                        uiSchema={this.uiSchema}
                        onButtonClick={this.onFormButtonClick}
                        requiredFlag={false}
                        onEnter={this.onEnter}
                    />
                </div>
            </div>
        </Page >
    })
}
