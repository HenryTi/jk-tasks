import * as React from 'react';
import { FA } from 'tonva';
import { TaskCommonType } from '../../taskCommonType';
import { UiSchema, UiInputItem, UiRadio } from 'tonva';

export const Visit: TaskCommonType = {
    caption: '拜访',
    icon: <FA name='flask' size="lg" fixWidth={true} />,
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' } as UiInputItem,
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] } as UiRadio,
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema,
    completSchema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'priortya', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    completuiSchema: {
        items: {
            description: { widget: 'text', label: '拜访结果', placeholder: '' } as UiInputItem,
            priorty: { widget: 'radio', label: '评价', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '很好' }] } as UiRadio,
            priortya: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] } as UiRadio,
            deadline: { widget: 'date', label: '完成时间', placeholder: '' } as UiInputItem,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema
}
