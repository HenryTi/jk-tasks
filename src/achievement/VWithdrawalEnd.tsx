import * as React from 'react';
import { VPage, Page, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export class VWithdrawalEnd extends VPage<CBalance> {

    amount: number;
    async open(amount: number) {
        this.amount = amount;
        this.openPage(this.page);
    }

    endWithdrawal = () => {
        this.closePage(2);
    }


    private page = observer(() => {

        return <Page header="余额提现" headerClassName={setting.pageHeaderCss}>
            <div className="text-center bg-white px-3 py-3" style={{ height: "100%" }} >
                <LMR left="提现金额" className="small my-2" right={<div>￥{this.amount}</div>}></LMR>
                <LMR left="转账到银行卡" className="small my-2" right="招商银行"></LMR>
                <div>
                    <button type="button" className="btn btn-primary" style={{ width: "40%", margin: "200px 0 200px 0" }} onClick={this.endWithdrawal} >完成</button>
                </div>
            </div>
        </Page >
    });
}
