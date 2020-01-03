import * as React from 'react';
import { View, FA, UiSelectBase } from 'tonva';
import { CType } from '../CType';
import { Task } from '../../model';

export class VDetailContent extends View<CType> {

    render(task: Task): JSX.Element {

        let model = this.controller.cSalesTask.getCommonType(task.biz.obj.name);
        let { completuiSchema } = model.taskCommonType;

        let { fields } = task;
        if (fields === undefined) return <></>;

        return <div className='w-100'>
            {fields.map((v, index) => {
                let { fieldName, value } = v;
                let { label, list } = completuiSchema.items[fieldName] as UiSelectBase;
                let left = <div className=''><FA name='caret-right' className='small text-info' fixWidth={true} />{label || fieldName}</div>;
                var selectItem: any;
                if (list) {
                    selectItem = list.find(v => v.value === value);
                }
                return <div className='row bg-white py-2' key={index}>
                    <div className="col-4 align-self-center">{left}</div>
                    <div className="col-8">{selectItem ? selectItem.title : value} </div>
                </div>
            })}
        </div>;
    }
}