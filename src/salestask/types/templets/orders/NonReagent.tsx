import * as React from 'react';
import { TaskCommonType } from '../../taskCommonType';
import { UiSchema, UiInputItem, UiRadio, FA } from 'tonva';

export const NonReagent: TaskCommonType = {
    caption: '任务',
    icon: <FA name='clock-o' size="lg" fixWidth={true} />,
    schema: [
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
        { name: 'description', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            priorty: {
                widget: 'radio', label: '重要性', defaultValue: 0,
                list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }],
                radioClassName: 'w-min-6c d-inline-block'
            } as UiRadio,
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
            result: { widget: 'textarea', label: '结果', placeholder: '请填写处理结果', row: 12 } as UiInputItem,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema
}
