import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page, FA } from 'tonva';
import { setting } from 'appConfig';

export class VError extends VPage<CStart> {
    async open(position: any) {
        await this.openPage(this.page, position);
    }


    private page = (position: any) => {
        return <Page header="无法通过" back="none" headerClassName={setting.pageHeaderCss}>
            <div className="p-5 text-center">
                <p className="text-primary mb-5">
                    <FA name="minus-circle" size="2x" className="text-danger" />
                    <br /><br />
                    无效的邀请码</p>
                <button className="btn btn-outline-primary w-6c" onClick={this.controller.startApp}>返回</button>
            </div>
        </Page>
    }
}
