import * as React from 'react';
import { observer } from 'mobx-react';
import { VMe } from '../me/VMe';
import { VTeam } from './VTeam';
import { VTeamDetail } from './VTeamDetail';
import { CUqBase } from '../CBase';
import { observable } from 'mobx';

/**
 *
 */
export class CTeam extends CUqBase {
    @observable achievement: any;

    //初始化
    protected async internalStart() {
        let team = await this.searchTeam();
        this.openVPage(VTeam, team);
    }

    //搜索我的团队
    searchTeam = async () => {
        let team = await this.uqs.salesTask.SearchTeam.table({});
        return team;
    }

    //显示粉丝信息
    showPeerDetail = async (teamItem: any) => {
        let query = { user: teamItem.children.id };
        let achievement = await this.uqs.salesTask.SearchAchievement.table(query);
        if (achievement.length > 0) {
            this.achievement = achievement[0];
        }
        this.openVPage(VTeamDetail, teamItem);
    }

    //保存粉丝自定义信息
    savePeerAssigned = async (peer: any, newValue: any) => {
        let param = { peer: peer.id, Assigned: newValue };
        this.uqs.salesTask.SavePeerAssigned.submit(param);
    }

    render = observer(() => {
        return this.renderView(VMe);
    })

    tab = () => {
        return <this.render />;
    }
}
