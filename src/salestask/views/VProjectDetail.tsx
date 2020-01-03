import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, List, tv } from 'tonva';
import { CSalesTask } from '../CSalesTask';

export class VProjectDetail extends VPage<CSalesTask> {

    private projects: any;

    async open(projects: any) {
        this.projects = projects;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return this.render();
    });

    private renderItem = (param: any, index: number) => {
        return tv(param.project, (project) => {
            let { name } = project;
            return <div className="px-3" >{name}</div>
        });
    }

    render() {

        let none = <div className="my-3 mx-2 text-muted">无项目</div>;
        return <Page header="项目详情" headerClassName="bg-primary">
            < List before={''} none={none} items={this.projects} item={{ render: this.renderItem }} />
        </Page >
    }
}

