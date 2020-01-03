import * as React from 'react';
import { VPage, Page, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export class VBalance extends VPage<CBalance> {


    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {

        let { salesAmont } = this.controller;
        let { totalReceivableAmount, totalaWithdrawal, waitWithdrawal } = salesAmont;
        let balance: number = totalReceivableAmount - totalaWithdrawal - waitWithdrawal;
        let right = <div className="cursor-pointer py-2 mx-3" onClick={this.controller.showBalanceHistory} >历史记录</div>;
        let buttondisabled = balance > 0 ? false : true;

        let onshowVWithdrawal = async () => await this.controller.showVWithdrawal(balance)
        return <Page header="" headerClassName={setting.pageHeaderCss} right={right}>
            <div className="text-center bg-white" style={{ height: "100%" }} >
                <div className="text-center bg-white" style={{ padding: "40px" }}></div>
                <i className="iconfont icon-zhichibizhong" style={{ fontSize: "80px", color: "#f6ad15", margin: "10%" }}></i>
                <div style={{ padding: "0px 80px 6px 80px" }}>我的余额</div>
                <div className="strong">
                    <FA name="cny" className="h3"> </FA>
                    <span className="h1 mx-1"> <strong>{(totalReceivableAmount - totalaWithdrawal - waitWithdrawal).toFixed(2)}</strong></span>
                </div>
                <div style={{ margin: "150px 10px 10px 10px" }}>
                    <button type="button" disabled={buttondisabled} className="btn btn-primary" style={{ padding: "6px 70px" }} onClick={onshowVWithdrawal}>提现</button>
                </div>
                <div className="small text-muted text-center" style={{ width: "100%", position: "absolute", bottom: "4%" }} >
                    <div className="py-2 h6 text-primary">常见问题</div>
                    <div>本服务有百灵威提供</div>
                </div>
            </div>
        </Page >
    });
}