import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, Schema, UiSchema, UiInputItem, UiRadio, Edit, ItemSchema } from 'tonva';
import { CCustomer } from './CCustomer';
import { mobileValidation, nameValidation, emailValidation } from 'tools/inputValidations';
import { setting } from 'appConfig';

export const myCustomerSchema: Schema = [
    { name: 'name', type: 'string', required: true },
    { name: 'salutation', type: 'string' },
    { name: 'gender', type: 'number' },
    { name: 'mobile', type: 'number' },
    { name: 'telephone', type: 'number' },
    { name: 'email', type: 'string' },
    { name: 'wechat', type: 'string' },
    { name: 'potential', type: 'string' },
    { name: 'research', type: 'string' },
    { name: 'addressString', type: 'string' },
];

export const myCustomerUISchema: UiSchema = {
    items: {
        name: { widget: 'text', label: '姓名', placeholder: '请输入姓名', rules: nameValidation } as UiInputItem,
        salutation: { widget: 'text', label: '称谓', placeholder: '请输入称谓' } as UiInputItem,
        gender: { widget: 'radio', label: '性别', list: [{ value: '1', title: '男' }, { value: '0', title: '女' }] } as UiRadio,
        mobile: { widget: 'text', label: '手机号', placeholder: '请输入手机号', rules: mobileValidation } as UiInputItem,
        telephone: { widget: 'text', label: '固话', placeholder: '请输入固话' } as UiInputItem,
        birthDay: { widget: 'datetime', label: '生日', placeholder: '请输入生日' } as UiInputItem,
        email: { widget: 'text', label: 'Email', placeholder: '请输入Email', rules: emailValidation } as UiInputItem,
        wechat: { widget: 'text', label: '微信', placeholder: '请输入微信号' } as UiInputItem,
        teacher: { widget: 'text', label: '老师', placeholder: '请输入老师姓名' } as UiInputItem,
        addressString: { widget: 'text', label: '地址', placeholder: '请输地址' } as UiInputItem,
        potential: {
            widget: 'radio', label: '潜力值',
            list: [{ value: 0, title: '小于10万' }, { value: 1, title: '10万-30万' }, { value: 2, title: '大于30万' }]
        } as UiRadio,
        research: {
            widget: 'radio', label: '研究方向',
            list: [{ value: 0, title: '有机' }, { value: 1, title: '化学' }, { value: 2, title: '分析' }, { value: 3, title: '材料' }]
        } as UiRadio,
    }
}

export class VCustomerEdit extends VPage<CCustomer> {

    @observable private customer: any;
    @observable isBinded: boolean = false;
    @observable bindTip: any = "";

    async open(customer: any) {
        this.customer = customer;
        this.openPage(this.page, customer);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.customer[name] = newValue;
        await this.controller.updateMyCustomer(this.customer);
    }

    private page = observer((param: any) => {
        /**
        let { cancelCustomer } = this.controller;
        let oncancelCustomer = async () => await cancelCustomer(this.customer);
        let footer = <div className="d-block">
             {this.bindTip}
             <div className="w-100  justify-content-end" >
                 <button type="button" className="btn btn-primary mx-1 my-1  " onClick={oncancelCustomer}>作废客户</button>
             </div>
         </div>
        **/
        let header: any = <span>{this.customer.name}</span>;
        return <Page header={header} headerClassName={setting.pageHeaderCss}>
            <Edit
                schema={myCustomerSchema}
                uiSchema={myCustomerUISchema}
                data={this.customer}
                onItemChanged={this.onItemChanged} />
        </Page >
    })
}