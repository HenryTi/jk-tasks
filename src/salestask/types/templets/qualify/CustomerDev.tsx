import * as React from 'react';
import { FA } from 'tonva';
import { TaskCommonType } from '../../taskCommonType';
import { UiSchema, UiCheckItem, UiInputItem, UiRadio } from 'tonva';

export const CustomerDev: TaskCommonType = {
    caption: '客户开发',
    icon: <FA name='address-book' size="lg" fixWidth={true} />,
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },

            description2: { widget: 'radio', label: '描述2', defaultValue: 1, list: [{ value: 0, title: '女' }, { value: 1, title: '男' }] } as UiRadio,
        }
    } as UiSchema,
    completSchema: [
        { name: 'name', type: 'string', required: false },
        { name: 'telephone', type: 'number', required: false },
        { name: 'email', type: 'string', required: false },
        { name: 'wechat', type: 'string', required: false },
        { name: 'teacher', type: 'string', required: false },
        { name: 'potential', type: 'string', required: false },
        { name: 'research', type: 'string', required: false },
    ],
    completuiSchema: {
        items: {
            name: { widget: 'text', label: '姓名', placeholder: '请输入姓名' } as UiInputItem,
            telephone: { widget: 'text', label: '电话', placeholder: '请输入电话' } as UiInputItem,
            email: { widget: 'text', label: '邮箱', placeholder: '请输入邮箱' } as UiInputItem,
            wechat: { widget: 'text', label: '微信', placeholder: '请输入微信号' } as UiInputItem,
            teacher: { widget: 'text', label: '老师', placeholder: '请输入老师' } as UiInputItem,
            potential: { widget: 'radio', label: '潜力值', defaultValue: 1, list: [{ value: 0, title: '小于10万' }, { value: 1, title: '10万-30万' }, { value: 2, title: '大于30万' }] } as UiRadio,
            research: { widget: 'radio', label: '研究方向', defaultValue: 1, list: [{ value: 0, title: '有机' }, { value: 1, title: '化学' }, { value: 1, title: '分析' }, { value: 1, title: '材料' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', },
        }
    } as UiSchema
}
