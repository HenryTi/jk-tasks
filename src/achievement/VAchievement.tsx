import * as React from 'react';
import { VPage, Page, LMR, Prop, ComponentProp, FA, PropGrid } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from '../consts';
import { CBalance } from './CBalance';
import { settings } from 'cluster';
import { setting } from 'appConfig';

function rowCom(iconName: string, iconColor: string, caption: string, value: any, onClick: any) {
    return <LMR className="cursor-pointer w-100 py-2 my-2 align-items-center  " onClick={onClick}
        left={<FA name={iconName} className={'mr-3 ' + iconColor} fixWidth={true} size="lg" />}
        right={<div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div>}>
        {caption}<span className=" ml-3">{value}</span>
    </LMR>;
}
function rowComNone(iconName: string, iconColor: string, caption: string, value: any, onClick: any) {
    return <LMR className="cursor-pointer w-100 py-2 my-2 align-items-center  " onClick={onClick}
        left={<FA name={iconName} className={'mr-3 ' + iconColor} fixWidth={true} size="lg" />}
        right={<div className="w-2c text-right" ></div>}>
        {caption}<span className=" ml-3">{value}</span>
    </LMR>;
}

export class VAchievement extends VPage<CBalance> {
    private salesAmont: any;

    async open(param: any) {
        this.salesAmont = param[0];
        if (this.salesAmont == null) {
            this.salesAmont = { oneSaleVolume: 0, twoSaleVolume: 0, threeSaleVolume: 0, oneAchievement: 0, twoAchievement: 0, threeAchievement: 0 }
        }
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {

        let { oneSaleVolume, oneAchievement, twoAchievement, threeAchievement } = this.salesAmont;
        let onshowAchievementDetailA = async () => await this.controller.showAchievementDetail("A");
        let onshowAchievementDetailB = async () => await this.controller.showAchievementDetail("B");
        let onshowAchievementDetailC = async () => await this.controller.showAchievementDetail("C");
        let rows: Prop[] = [
            {
                type: 'component',
                component: rowComNone('cny', 'text-warning', '销售金额', oneSaleVolume, undefined),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('gg', 'text-info', 'A类绩效', oneAchievement, onshowAchievementDetailA),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('gg', 'text-danger', 'B类绩效', twoAchievement, onshowAchievementDetailB),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('gg', 'text-warning', 'C类绩效', threeAchievement, onshowAchievementDetailC),
            } as ComponentProp,
        ];

        return <Page header="我的业绩" headerClassName={setting.pageHeaderCss} >
            <PropGrid className="" rows={rows} values={null} alignValue="right" />
        </Page >
    })
}
