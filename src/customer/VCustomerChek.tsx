import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { setting } from 'appConfig';

import { CCustomer } from './CCustomer';

export class VCustomerChek extends VPage<CCustomer> {

    private result: number;
    async open(param: any) {
        this.result = param;
        this.openPage(this.page, param);
    }

    comeBack = () => {
        this.closePage(1);
    }
    private page = observer((param: any) => {

        var show: any;
        if (this.result == 1) {
            show = <span className="px-4">根据所查客户基本信息，系统认为该客户可能已与其他销售绑定。</span>;
        } else {
            show = <span className="px-4">根据所查客户基本信息，系统未发现该客户与其他销售的绑定关系。</span>;
        }
        return <Page header='新建客户' headerClassName={setting.pageHeaderCss}>
            <div className="w-100  text-muted my-4 px-4">
                {show}
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}>返回</label>
            </div>
        </Page>
    })
}