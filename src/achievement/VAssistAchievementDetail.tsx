import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, TabCaption, tv, Tabs } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export enum TabStatus { sum = 0, pending = 1 };
export enum TabType { A = 1, B = 2, C = 3 };

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
const tabCaption = (caption: string, amount: number): TabCaption => {
    return (selected: boolean) => <div className="w-100 small text-center">
        <div className={color(selected)}>{caption}</div>
    </div>;
}

export class VAssistAchievementDetail extends VPage<CBalance> {

    @observable private achievements: any[] = [];
    @observable private tab_Status: TabStatus = TabStatus.sum;

    async open(param: TabStatus) {
        this.tab_Status = param;
        this.openPage(this.page);
        await this.loadAchievements();
    }

    private renderItem(model: any, index: number) {
        let { date, orderAmount, orderno, state, mycustomer } = model;
        var statusShow: any;
        if (state === 1) {
            statusShow = "已转入";
        } else {
            statusShow = "待转入";
        }

        if (mycustomer) {
            mycustomer = tv(mycustomer, v => v.name);
        } else {
            mycustomer = "";
        }

        let data = <EasyDate date={date} />;
        return <div className="d-block">
            <div>
                <LMR className="px-3 pt-2 small" left={<div className="text-muted">订单产生日期</div>} right={data}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">订单号</div>} right={orderno}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">客户</div>} right={mycustomer} ></LMR>
                <LMR className="px-3 small" left={<div className="text-muted"> 订单金额</div>} right={<div><span className="iconfont icon-huobiqiandaizijin" style={{ fontSize: "15px", color: "#f6ad15" }}></span>{orderAmount}</div>}></LMR>
                <LMR className="px-3 pb-2 small" left={<div className="text-muted">状态</div>} right={statusShow}></LMR>
            </div>
        </div >
    }

    private async loadAchievements() {
        let achievements = await this.controller.searchAchievementDetail(1, this.tab_Status);
        this.achievements.splice(0);
        this.achievements.push(...achievements);
    }

    private tabContent = () => {
        return <List items={this.achievements} item={{ render: this.renderItem }} none="无收益" />
    }

    private page = observer(() => {
        let { oneSaleVolume } = this.controller.salesAmont;
        let tabs = [
            {
                name: 'a',
                caption: tabCaption('销售额', oneSaleVolume),
                content: this.tabContent,
                onShown: async () => {
                    this.tab_Status = TabStatus.sum
                    await this.loadAchievements();
                }
            }, {
                name: 'b',
                caption: tabCaption('待到款', oneSaleVolume),
                content: this.tabContent,
                onShown: async () => {
                    this.tab_Status = TabStatus.pending
                    await this.loadAchievements();
                }
            }
        ];
        return <Page header="收益明细" headerClassName={setting.pageHeaderCss} >
            <Tabs tabs={tabs} tabPosition="top" />
        </Page >
    })
}
