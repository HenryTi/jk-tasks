import * as React from 'react';
import { View } from 'tonva';
import { CType } from '../CType';
import { Task } from '../../model';

export class VActionsBottom extends View<CType> {

    render(task: Task) {
        let { showTaskComplet, showTaskExtension, showTaskInvalid } = this.controller.cSalesTask;
        let tasks = {
            id: task.id,
            type: task.type,
            biz: task.biz,
            description: null as any,
            remindDate: null as any,
            deadline: null as any,
            customer: task.customer
        }
        let onProcess = async () => await showTaskComplet(tasks);
        let onPostpond = async () => await showTaskExtension(tasks);
        let onInvalid = async () => await showTaskInvalid(tasks);

        return <div className="d-flex px-1">
            <div className="flex-grow-1 align-self-center justify-content-end">
                <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={onPostpond} >延迟任务</button>
                <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={onInvalid} >取消任务</button>
                <button type="button" className="btn btn-primary ml-2 align-self-center" onClick={onProcess}>处理任务</button>
            </div>

        </div>;
    }
}

/**
 *  <div className="flex-grow-1 align-self-center justify-content-end">
                <div style={{ backgroundColor: "#8a8a8a", color: "#ffffff", padding: "13px 20px" }} onClick={onPostpond} >延迟任务</div>
                <div style={{ backgroundColor: "#d81e06", color: "#ffffff", padding: "13px 20px" }} onClick={onInvalid} >取消任务</div>
                <div style={{ backgroundColor: "#f8a905", color: "#ffffff", padding: "13px 20px" }} onClick={onProcess}>处理任务</div>
            </div>
 * **/