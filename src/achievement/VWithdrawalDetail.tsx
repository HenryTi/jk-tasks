import * as React from 'react';
import { VPage, Page, EasyTime } from 'tonva';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export class VWithdrawalDetail extends VPage<CBalance> {

    async open(order: number) {

        this.openPage(this.page, order);
    }

    private renderitme(decription: any, val: any): JSX.Element {
        return <div className="bg-white row px-4 py-1 small">
            <div className="col-3 text-muted">{decription}</div>
            <div className="col-9">{val}</div>
        </div>
    }

    private page = observer((order: any) => {

        let { brief, data, state, comments } = order;
        let { no, discription, date } = brief;
        let { amount } = data;
        let discriptions = discription === "withdrawal" ? "-" : "+";
        discription = discription === "withdrawal" ? "支出" : "收入";
        let stateShow: string = "";
        if (state.id === 1) {
            stateShow = "处理中";
        } else if (state.id === 2) {
            stateShow = "已转出";
        } else if (state.id === 3) {
            stateShow = "已驳回";
        }

        return <Page header="详情" headerClassName={setting.pageHeaderCss}>
            <div className="text-center bg-white" >
                <div className="pt-4 h6"> {discription}</div>
                <div className="py-4 h4"><strong>{discriptions}{amount.toFixed(2)}</strong></div>
                <div className="sep-product-select" style={{ width: "90%", margin: '0 auto 0 auto', padding: "10px 0 10px 0" }} />
            </div>
            {this.renderitme("类型", discription)}
            {this.renderitme("时间", <EasyTime date={date}></EasyTime>)}
            {this.renderitme("单号", no)}
            {this.renderitme("状态", stateShow)}
            {this.renderitme("备注", comments)}
            <div className="text-center bg-white py-3"></div>
        </Page >
    });
}