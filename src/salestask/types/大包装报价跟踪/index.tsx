import * as React from 'react';
import { CType } from '../CType';
import { VPage } from 'tonva';
import { FA } from 'tonva';
import { VDetail } from './VDetail';
import { VCreate } from './VCreate';
import { Task } from '../../model';

export class 大包装报价跟踪 extends CType {

    icon = <FA name='flask' size="lg" fixWidth={true} />;
    caption = '任务';

    protected internalStart(param?: any): Promise<void> {
        return;
    }

    /**
    protected renderContent = (task: Task): JSX.Element => {
        return this.renderView(VDetail, task);
    }
    */

    async showCreate(task: Task): Promise<void> {
        this.openVPage(VCreate, task);
        return;
    }
}
