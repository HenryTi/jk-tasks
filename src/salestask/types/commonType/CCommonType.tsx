import { CType } from '../CType';
import { VCreateCheck } from '../../views/VCreateCheck';
import { Task } from '../../model';
import { TaskCommonType } from '../taskCommonType';
import { VCreate } from './VCreate';

export class CCommonType extends CType {
    taskCommonType: TaskCommonType;
    constructor(taskCommonType: TaskCommonType, res: any) {
        super(res);
        this.taskCommonType = taskCommonType;
        this.icon = taskCommonType.icon;
        this.caption = taskCommonType.caption;
    }

    protected internalStart(param?: TaskCommonType): Promise<void> {
        return;
    }

    async showCreate(task: Task): Promise<void> {
        this.openVPage(VCreate, task);
        return;
    }

    //显示查询客户页面
    showCrateCheck = async (task: Task) => {
        this.openVPage(VCreateCheck, task);
    }

}
