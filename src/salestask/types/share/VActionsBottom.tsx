import * as React from 'react';
import { View } from 'tonva-tools';
import { CTaskType } from '../CTaskType';
import { PropGrid, Prop, LMR, ComponentProp, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { Task } from '../../model';

export class VActionsBottom extends View<CTaskType> {

    render(task: Task) {
        let { showTaskComplet: showSalesTaskComplet, showTaskExtension: showSalesTaskExtension, showTaskInvalid: showSalesTaskInvalid } = this.controller.cSalesTask;

        let onProcess = async () => await showSalesTaskComplet(task);
        let onPostpond = async () => await showSalesTaskExtension(task);
        let onInvalid = async () => await showSalesTaskInvalid(task);

        return <div className="d-flex px-1">
            <div className="flex-grow-1 align-self-center justify-content-start">
                <button type="button" className="btn btn-primary" onClick={onProcess} >&nbsp;处理&nbsp;</button>
            </div>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={onPostpond} >推迟</button>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={onInvalid} >取消</button>
        </div>;
    }
}