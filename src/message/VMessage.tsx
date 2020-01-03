import * as React from 'react';
import { VPage, Page, List, LMR, tv, EasyDate } from 'tonva';
import { CMessage } from './CMessage';
import { setting } from 'appConfig';


export class VMessage extends VPage<CMessage> {

    private message: any;
    async open(message: any) {
        this.message = message;
        this.openPage(this.page);
    }

    private renderItem = (model: any, index: number) => {
        let { date, note, peer } = model;
        let left = <small className="text-muted"><EasyDate date={date} /></small>;
        let rigth = <small className="text-muted">{tv(peer, v => v.name)}</small>;
        return <div className="d-block p-3">
            <LMR left={left} right={rigth}></LMR>
            <LMR > {note}</LMR>
        </div>
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted"></div>;
        return <Page header='消息' headerClassName={setting.pageHeaderCss} >
            <List before={''} none={none} items={this.message} item={{ render: this.renderItem }} />
        </Page>
    }
}
