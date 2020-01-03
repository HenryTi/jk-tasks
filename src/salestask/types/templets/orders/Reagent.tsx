import * as React from 'react';
import { FA } from 'tonva';
import { TaskCommonType } from '../../taskCommonType';
import { UiSchema, UiInputItem, UiRadio } from 'tonva';

export const Reagent: TaskCommonType = {
    caption: '试剂报价跟踪',
    icon: <FA name='shopping-bag' size="lg" fixWidth={true} />,
    schema: [
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
        { name: 'description', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] } as UiRadio,
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' } as UiInputItem,
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' } as UiInputItem,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema,
    completSchema: [
        { name: 'result', type: 'string', required: false },
    ],
    completuiSchema: {
        items: {
            result: { widget: 'radio', label: '丢单原因', defaultValue: 1, list: [{ value: 0, title: '货期' }, { value: 1, title: '价格' }, { value: 1, title: '质量' }, { value: 1, title: '资质' }, { value: 1, title: '发票' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema
}
