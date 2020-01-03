import * as React from 'react';
import { VPage, Page, List, LMR, tv, FA } from 'tonva';
import { CMessage } from './CMessage';
import { setting } from 'appConfig';

export class VMessageDetail extends VPage<CMessage> {

    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    private renderItem = (team: any, index: number) => {

        return <LMR className="px-3 py-2 ">

        </LMR>
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">无团队</div>;
        return <Page header='我的团队' headerClassName={setting.pageHeaderCss} >
            <List before={''} none={none} items={this.team} item={{ render: this.renderItem }} />
        </Page>
    }
}
