import * as React from 'react';
import { VPage, Page, nav, Prop, PropGrid } from 'tonva';
import { CMe } from './CMe';
import { appConfig, setting } from '../appConfig';

export class VSet extends VPage<CMe> {

    async open(position: any) {
        this.openPage(this.page);
    }

    private logout = () => {
        nav.showLogout();
    }

    private changePassword = async () => {
        await nav.changePassword();
    }

    private page = () => {
        let rows: Prop[] = [
            '',
            {
                type: 'component',

                component: <div className="py-2">
                    <i className="iconfont icon-zhanghuxinxi mr-2" style={{ fontSize: "20px", color: "#2aa515" }}></i>账户信息
                </div>,
                onClick: this.controller.showAccount
            },
            '',
            {
                type: 'component',
                component: <div className="py-2">
                    <i className="iconfont icon-mima mr-2" style={{ fontSize: "20px", color: "#2aa515" }}></i><span className="pb-4 mb-4">密码</span>
                </div>,
                onClick: this.changePassword
            },
            '',
            {
                type: 'component',
                component: <div className="w-100 d-flex py-2 justify-content-between" onClick={() => this.controller.showAbout()}>
                    <div>
                        <i className="iconfont icon-guanyu mr-2" style={{ fontSize: "20px", color: "#2aa515" }}></i>关于{setting.sales.appName}
                    </div>
                    <div className="py-2 small">V {appConfig.version}</div>
                </div>,
            },
            '',
            {
                type: 'component',
                component: <div className="w-100 text-center py-3" onClick={this.logout}>
                    退出
                </div>,
            },
            ''
        ];


        return <Page header='设置' headerClassName={setting.pageHeaderCss} >
            <PropGrid rows={rows} values={{}} />
        </Page >
    }
}
