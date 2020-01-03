import * as React from 'react';
import { View } from 'tonva';
import { CType } from '../CType';
import { PropGrid, Prop, LMR, ComponentProp, FA } from 'tonva';
import { tv } from 'tonva';
import { Task } from '../../model';

export class VCreateTop extends View<CType> {

    private itemss = "cursor-pointer my-2 w-100";
    render(task: Task) {
        let { showCustomerDetail } = this.controller.cSalesTask;
        let { customer } = task;
        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className={this.itemss} onClick={() => showCustomerDetail(customer)}
                    left={<div> <FA name="user" className="text-info mr-2 pt-1 " /> </div>}
                    right={<div className="text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
            } as ComponentProp,
        ];
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}