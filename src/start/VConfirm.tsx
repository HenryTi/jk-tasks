import * as React from 'react';
import { VPage, Page, Image, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CStart } from './CStart';
import { setting } from 'appConfig';


export class VConfirm extends VPage<CStart> {

    async open(position: any) {
        this.openPage(this.page, position);
    }

    private meInfoAgent(position: any) {
        let { code, user } = position;
        code = code + "";
        let p1 = code.substr(0, 4);
        let p2 = code.substr(4);
        code = p1 + ' ' + p2;
        //let url = setting.url + "?type=invitation&code=" + code;
        return <div id="qrid" className="text-center" style={{ width: 'auto', height: '70%' }}  >
            <Image src={setting.sales.logo} className="mt-4" style={{ width: 'auto', height: '50%', margin: '2rem auto, 0 auto' }} />
            <div className="my-4">
                <div> {tv(user, v => v.name)}，邀请您加入{setting.sales.appName}。</div>
                <div>邀请码：<span className="text-info">{code}</span></div>
            </div>
        </div>
    }
    private meInfoAssist(position: any) {
        let { code } = position;
        code = code + "";
        let p1 = code.substr(0, 4);
        let p2 = code.substr(4);
        code = p1 + ' ' + p2;
        //let url = setting.url + "?type=invitation&code=" + code;
        return <div id="qrid" className="text-center" style={{ width: 'auto', height: '70%', padding: "100px 0 0 0 " }}  >
            <Image src={setting.sales.logo} style={{ width: 'auto', height: '30%', margin: '10rem auto, 0 auto' }} />
            <div className="my-4">
                <div className="text-info py-2">您还未被授权</div>
                <div className="text-info py-2">请联系管理员开通内部销售权限</div>
            </div>
        </div>
    }

    private CreatePosition = async (code: string) => {
        await this.controller.createPosition({ invitacode: code });
    }

    private page = observer((position: any) => {

        let onCreatePosition = async () => await this.CreatePosition(position.code + "");
        let footer: any = setting.sales.isInner ? undefined :
            <div className="d-block">
                <button type="button" className="btn btn-primary w-100" onClick={onCreatePosition}>确认</button>
            </div>

        let header = setting.sales.isInner ? "提示" : "邀请人";
        return <Page header={header} headerClassName={setting.pageHeaderCss} logout={true} back='none' footer={footer} >
            {setting.sales.isInner ? this.meInfoAssist(position) : this.meInfoAgent(position)}
        </Page>

    })
}
