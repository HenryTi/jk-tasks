import * as React from 'react';
import { nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { VMeDetail } from './VMeDetail';
import { VSet } from './VSet';
import { VInvitationCode } from './VInvitationCode';
import { VAccount } from './VAccount';
import { VAbout } from './VAbout';

export class CMe extends CUqBase {
    inviteCode: string;
    position: any;

    //初始化
    protected async internalStart(param: any) {
        await this.load();
        nav.clear();
        this.openVPage(VMe, param);
    }

    //加载邀请码
    load = async () => {
        await nav.loadMe();
        this.position = await this.uqs.salesTask.SearchPosition.table({ position: undefined });
        if (this.position.length > 0) {
            let code = String(this.position[0].code + 100000000);
            this.inviteCode = code;
        } else {
            this.inviteCode = "100000000";
        }
    }

    //显示我的个人信息
    showMeDetail = async () => {
        this.openVPage(VMeDetail)
    }

    //搜索我的邀请码
    searchPosition = async () => {
        let position = await this.uqs.salesTask.SearchPosition.table({});
        return position;
    }

    //显示我的团队
    showTeam = async () => {
        await this.cApp.cBalance.getComputeAchievement();
        let { cTeam } = this.cApp
        await cTeam.start();
    }

    showMyCustomer = async (type: number) => {
        await this.cApp.cBalance.getComputeAchievement();
        let { showMyCustomer } = this.cApp.cCustomer;
        await showMyCustomer("", type);
    }

    //显示消息
    showMessage = async () => {
        await this.cApp.cMessage.start();
    }

    //显示消息
    showSet = async () => {
        this.openVPage(VSet)
    }

    showInvitationCode = async (param: string) => {
        this.openVPage(VInvitationCode, param);
    }

    showAccount = async () => {
        let data = {
            telephone: "",
            identityname: "",
            identitycard: "",
            identityicon: "",
            subbranchbank: "",
            bankaccountnumber: ""
        };
        let account = await this.uqs.salesTask.WebUserAccountMap.query({ webuser: this.user.id });
        if (account.ret.length > 0) {
            let { telephone, identityname, identitycard, identityicon, subbranchbank, bankaccountnumber } = account.ret[0];
            data.telephone = telephone === undefined ? "" : telephone;
            data.identityname = identityname === undefined ? "" : identityname;
            data.identitycard = identitycard === undefined ? "" : identitycard;
            data.identityicon = identityicon === undefined ? "" : identityicon;
            data.subbranchbank = subbranchbank === undefined ? "" : subbranchbank;
            data.bankaccountnumber = bankaccountnumber === undefined ? "" : bankaccountnumber;
        }
        this.openVPage(VAccount, data);
    }

    saveAccount = async (param: any) => {
        let data = {
            webuser: this.user.id,
            telephone: param.telephone,
            identityname: param.identityname,
            identitycard: param.identitycard,
            identityicon: param.identityicon,
            subbranchbank: param.subbranchbank,
            bankaccountnumber: param.bankaccountnumber,
        };
        await this.uqs.salesTask.AddWebUserAccountMap.submit(data);
    }

    showAbout = () => {
        this.openVPage(VAbout);
    }
    /**
    IsCanUseCoupon = async () => {
        let a = await this.uqs.salesTask.IsCanUseCoupon.submit({ code: "19521548", webUser: "46627" });
        let b = a;
    }
    **/

    render = () => {
        return this.renderView(VMe);
    }

    tab = () => {

        return <this.render />;
    }
}
