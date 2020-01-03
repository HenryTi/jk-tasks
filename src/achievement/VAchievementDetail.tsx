import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, TabCaption, Tabs, tv } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
const tabCaption = (caption: string, amount: number): TabCaption => {
    return (selected: boolean) => <div className="w-100 small pt-2 text-center">
        <div className={color(selected)}>{caption}</div>
        <div className={color(selected)}>{amount}</div>
    </div>;
}

export enum TabStatus { sum = 0, pending = 1 };
export enum TabType { A = 1, B = 2, C = 3 };

export class VAchievementDetail extends VPage<CBalance> {

    @observable private achievements: any[] = [];
    @observable private tab_Status: TabStatus = TabStatus.sum;
    @observable private type: TabType = TabType.A;

    private oneAchievement: any;
    private twoAchievement: any;
    private threeAchievement: any;

    async open(param: TabStatus) {
        this.tab_Status = param;
        let { oneAchievement, twoAchievement, threeAchievement } = this.controller.salesAmont;
        this.oneAchievement = oneAchievement;
        this.twoAchievement = twoAchievement;
        this.threeAchievement = threeAchievement;
        this.openPage(this.page);
    }

    private renderItem(model: any, index: number) {
        let { date, amount, orderno, state, mycustomer } = model;
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
                <LMR className="px-3 pt-2 small" left={<div className="text-muted">收益产生日期</div>} right={data}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">订单号</div>} right={orderno}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">客户</div>} right={mycustomer} ></LMR>
                <LMR className="px-3 small" left={<div className="text-muted"> 预估金额</div>} right={<div><span className="iconfont icon-huobiqiandaizijin" style={{ fontSize: "15px", color: "#f6ad15" }}></span>{amount}</div>}></LMR>
                <LMR className="px-3 pb-2 small" left={<div className="text-muted">状态</div>} right={statusShow}></LMR>
            </div>
        </div >
    }

    private header = () => {

        let onClickA = () => this.onClickHeader(TabStatus.sum);
        let onClickB = () => this.onClickHeader(TabStatus.pending);
        if (this.tab_Status === TabStatus.sum) {
            return <div className="w-100 text-center mr-4 cursor-pointer ">
                <span className="bg-white text-info mr-1 px-3 py-2" onClick={onClickA} >累计收益</span>
                <span className="px-3 py-2" onClick={onClickB} >&nbsp;待到款&nbsp;</span>
            </div>;
        } else {
            return <div className="w-100 text-center mr-4 cursor-pointer  ">
                <span className="mr-1 px-3 py-2" onClick={onClickA}>累计收益</span>
                <span className="bg-white text-info px-3 py-2" onClick={onClickB}>&nbsp;待到款&nbsp;</span>
            </div >;
        }
    }

    private onClickHeader = async (status: TabStatus) => {
        if (this.tab_Status === status) return;
        this.tab_Status = status;
        await this.loadAchievements();
    }

    private tabContent = () => {
        return <List items={this.achievements} item={{ render: this.renderItem }} none="无收益" />
    }

    private async loadAchievements() {
        let achievements = await this.controller.searchAchievementDetail(this.type, this.tab_Status);
        this.achievements.splice(0);
        this.achievements.push(...achievements);
    }

    private page = observer(() => {

        let tabs = [
            {
                name: 'a',
                caption: tabCaption('A类', this.oneAchievement),
                content: this.tabContent,
                onShown: async () => {
                    this.type = TabType.A;
                    await this.loadAchievements();
                }
            }, {
                name: 'b',
                caption: tabCaption('B类', this.twoAchievement),
                content: this.tabContent,
                onShown: async () => {
                    this.type = TabType.B;
                    await this.loadAchievements();
                }
            }, {
                name: 'c',
                caption: tabCaption('C类', this.threeAchievement),
                content: this.tabContent,
                onShown: async () => {
                    this.type = TabType.C;
                    await this.loadAchievements();
                }
            }
        ];

        return <Page header={this.header()} headerClassName={setting.pageHeaderCss} >
            <Tabs tabs={tabs} tabPosition="top" />
        </Page >
    })
}
