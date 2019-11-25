import * as React from 'react';
import { VPage, Page, FA } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from '../consts';
import { CBalance } from './CBalance';

export class VBalance extends VPage<CBalance> {


    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {

        let { salesAmont } = this.controller.cApp.cMe;
        let { totalReceivableAmount, totalaWithdrawal } = salesAmont;
        let balance: number = totalReceivableAmount - totalaWithdrawal;
        let right = <div className="cursor-pointer py-2 mx-3" onClick={this.controller.showBalanceHistory} >余额明细</div>;
        let buttondisabled = balance > 0 ? false : true;

        let onshowVWithdrawal = async () => await this.controller.showVWithdrawal(balance)
        return <Page header="" headerClassName={consts.headerClass} right={right}>
            <div className="text-center bg-white" style={{ height: "100%" }} >
                <div style={{ fontSize: "100px", padding: "60px 0 0 0 " }}><strong><FA name="money" className="text-warning" /></strong></div>
                <div style={{ padding: "0px 80px 6px 80px" }}>我的余额</div>
                <strong>
                    <FA name="cny" className="h2"> </FA>
                    <span className="h1 mx-1">{balance}</span>
                </strong>
                <div>
                    <button type="button" disabled={buttondisabled} className="btn btn-primary" style={{ margin: "100px 10px 10px 10px", padding: "6px 80px 6px 80px" }} onClick={onshowVWithdrawal}>提现</button>
                </div>
            </div>
        </Page >
    });
}
