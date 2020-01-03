import * as React from 'react';
import { VPage, Page, LMR, SearchBox, List, EasyDate } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { setting } from 'appConfig';

export class VCouponList extends VPage<CCoupon> {

    async open(param: any) {
        this.openPage(this.page);
    }

    private renderItem = (coupon: any, index: number) => {
        let { showCouponDetail } = this.controller;
        let onshowCouponDetail = async () => await showCouponDetail(coupon.id);
        var inviteCode = "";
        let { code, validitydate, discount, preferential, isValid } = coupon;
        if (code) {
            code = String(code + 100000000);
            let p1 = code.substr(1, 4);
            let p2 = code.substr(5);
            inviteCode = p1 + ' ' + p2;
        }

        let aleft = <div><i className="iconfont icon-youhuiquantuangou pr-2" style={{ fontSize: "20px", color: "#f6ad15" }}></i>{inviteCode}</div>;
        let aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
        let bcenter: any, bleft: any;
        if (typeof discount === 'number') {
            let discountShow: any;
            discountShow = (1 - discount) * 10;

            bleft = <div><small><span className=" mx-3 ">{discountShow === 10 ? '无折扣' : <>{discountShow.toFixed(1)} 折</>}</span></small></div>;
        }
        if (preferential) {
            bcenter = <div className="text-muted"><small>优惠：<span className="mx-3">￥{preferential}</span></small></div>;
        }

        return <LMR className="px-3 py-2" onClick={onshowCouponDetail}>
            <LMR left={aleft} right={aright}></LMR>
            <LMR left={bleft} right={<small className="text-muted">{isValid ? '有效' : '无效'}</small>}>
                {bcenter}
            </LMR>
        </LMR >
    }

    private page = observer(() => {
        let { pageCoupon } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">还没有优惠券哦！马上添加招揽客户吧！</div>;

        return <Page header='优惠券列表' headerClassName={setting.pageHeaderCss} >
            <SearchBox className="px-1 w-100  mt-2 mr-2  "
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索优惠券"
            />
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page>
    })
}
