import * as React from 'react';
import classNames from 'classnames';
import { View } from 'tonva';
import { CType } from '../CType';
import { PropGrid, Prop, LMR, ComponentProp, FA, EasyDate } from 'tonva';
import { tv } from 'tonva';
import { Task } from '../../model';
/* eslint-disable */
const cnRow = 'w-100 py-3';
const cnRowCustor = classNames(cnRow, 'cursor-pointer');
const right = <div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>;

export class VDetailTop extends View<CType> {

    render(task: Task) {

        let { showCustomerDetail } = this.controller.cSalesTask;
        let { customer, description, deadline } = task;
        let onClickCustomer = () => showCustomerDetail(customer);

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className={cnRowCustor} onClick={onClickCustomer}
                    left={<div className="mr-2"> <FA name="user" className="text-info mr-2 pt-1" /> </div>}
                    right={right}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'phone',
                component: <LMR className={cnRowCustor} onClick={onClickCustomer}
                    left={<div className="mr-2"> <FA name="phone" className="text-info mr-2 pt-1" /> </div>}
                    right={right}>
                    {tv(customer, v => <>{v.telephone}</>)}
                </LMR>,
            } as ComponentProp,
        ];
        if (deadline) {
            rows.push({
                type: 'component',
                name: 'deadline',
                component: <LMR className={cnRow}
                    left={<div className="mr-2"> <FA name="clock-o" className="text-info mr-2 pt-1 " /> </div>}>
                    {<EasyDate date={deadline} />}
                </LMR>,
            } as ComponentProp);
        }
        /** 
        rows.push({
            type: 'component',
            name: 'customer',
            component: <LMR className={cnRowCustor} onClick={onShowSalesTaskHistory}
                left={<span><FA className="text-warning" name="hand-o-right" /> &nbsp; 详情</span>}
                right={right} />,
            //label: '执行过程',
        } as ComponentProp);
        */
        if (description) {
            rows.push({
                type: 'component',
                name: 'description',
                component: <div className="w-100 py-3">{description}</div>,
            } as ComponentProp);
        }
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}