import { CSalesTask } from '../CSalesTask';
import { VAi } from './VAi';
import { VSelectBiz } from './VSelectBiz';
import { TaskType, Task } from '../model';
import { CUqSub } from '../../CBase';

/**
 *
 */
export class CSelectBiz extends CUqSub {
    get owner(): CSalesTask { return this._owner as CSalesTask }

    taskBizs: any[];
    taskType: TaskType;
    private task: Task;

    //初始化
    protected async internalStart(task: Task) {
        this.task = task;
        this.taskType = task.type;
        await this.getBizFromTaskTypeId(this.taskType);
        this.openVPage(VSelectBiz);
    }

    //搜索任务类型
    private async getBizFromTaskTypeId(taskType: TaskType) {
        let ret = await this.uqs.salesTask.TaskBiz.query({ type: taskType });
        this.taskBizs = ret.ret;
    }

    //返回添加任务页面
    selectTaskBiz = async (taskbiz: any) => {
        this.task.biz = taskbiz.biz.obj;
        this.cApp.cCustomer.showSelectCustomer(this.task)
        //this.cSalesTask.cApp.cCustomer.start(this.task);
    }

    //返回添加任务页面
    returnTaskBiz = async (type: any): Promise<any> => {
        this.returnCall(type);
    }


    aiClick = () => {
        this.openVPage(VAi);
    }
}
