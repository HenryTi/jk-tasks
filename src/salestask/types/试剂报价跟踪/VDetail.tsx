import * as React from 'react';
import { VPage, Page, PageItems, TabCaptionComponent, Tabs } from 'tonva';
import { List, LMR, EasyDate, PropGrid, Prop, StringProp, ComponentProp, FA } from 'tonva';
import { observer } from 'mobx-react';
import { tv } from 'tonva';
import { CType } from '../CType';
import { Task } from '../../model';

export class VDetail extends VPage<CType> {

    async open(task: Task) {
        this.openPage(this.page, task);
    }

    private page = observer((task: any) => {
        return this.render(task);
    });

    render(task: Task) {
        return <></>;
    }
}