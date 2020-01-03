import * as React from 'react';
import { VPage, Page, List, LMR, tv, FA } from 'tonva';
import { CTeam } from './CTeam';
import { setting } from 'appConfig';

export class VTeam extends VPage<CTeam> {

    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    private userSpan(displayName: JSX.Element, assigned: string): JSX.Element {
        return assigned ?
            <><b>{assigned} &nbsp; <small className="muted">{displayName}</small></b></>
            : <b>{displayName}</b>
    }


    private renderItem = (teamItem: any, index: number) => {

        let { showPeerDetail } = this.controller;
        let onshowPeerDetail = async () => await showPeerDetail(teamItem);
        let { children, volume, assigned } = teamItem;
        let displayName = tv(children, v => v.nick || v.name);

        return <LMR className="px-3 py-2 " onClick={onshowPeerDetail}
            left={<div> <FA className="text-info px-2" name="user" /></div >}
            right={volume && <div className="w-2c mr-3 text-right" >￥{volume}</div>}>
            <div className="font-weight-bold ">{this.userSpan(displayName, assigned)}</div>
        </LMR >
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">还没有团队哦！马上发展团队吧！！</div>;
        return <Page header='我的团队' headerClassName={setting.pageHeaderCss} >
            <List before={''} none={none} items={this.team} item={{ render: this.renderItem }} />
        </Page>
    }
}