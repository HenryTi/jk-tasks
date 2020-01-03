import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page } from 'tonva';
import { setting } from 'appConfig';

export class VOK extends VPage<CStart> {
    async open(position: any) {

        this.openPage(this.page, position);
    }

    private page = (position: any) => {
        return <Page header="注册成功" headerClassName={setting.pageHeaderCss}>
            <div className="p-5 text-center">
                <i className="iconfont icon-ok" style={{ margin: "50px", fontSize: "100px", color: "#2aa515" }}></i>
                <p className="text-primary mb-5">欢迎加入{setting.sales.appName}体系。</p>
                <button className="btn btn-outline-primary w-6c" onClick={this.controller.startApp}>开始体验</button>
            </div>
        </Page>
    }
}
