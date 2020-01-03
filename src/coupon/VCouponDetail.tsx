import * as React from 'react';
import { VPage, Page, Prop, PropGrid, ComponentProp, tv, LMR, EasyDate } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { setting } from 'appConfig';

export class VCouponDetail extends VPage<CCoupon> {

    private coupon: any;
    async open(coupon: any) {

        this.coupon = coupon;
        this.openPage(this.page);
    }

    private oninvalidCoupon = async () => await this.controller.invalidCoupon(this.coupon);

    private page = observer(() => {
        let { code, validitydate, discount, isValid, customer } = this.coupon;

        var inviteCode: string = "";
        if (code) {
            let p1 = code.substr(0, 4);
            let p2 = code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }
        var discountShow: any;
        discountShow = (1 - discount) * 10;

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优 惠 码：">
                    <div className="mx-3">{inviteCode}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="有 效 期：">
                    <div className="mx-3">{<EasyDate date={validitydate} />}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优 &nbsp; &nbsp; 惠：">
                    <div className="mx-3">折扣：{discountShow.toFixed(1)} 折 </div>
                </LMR >
            } as ComponentProp
        ];
        if (customer.obj !== undefined) {
            rows.push(
                {
                    type: 'component',
                    name: 'customer',
                    component: <>
                        {
                            tv(
                                customer, v =>
                                <LMR className="cursor-pointer w-100 py-3"
                                    left="指定客户："
                                    right={<div>{tv(v.unit, s => s.name)}</div>}>
                                    <div className="mx-3">{v.name}</div>
                                </LMR >
                            )
                        }
                    </>
                } as ComponentProp
            )
        }

        rows.push(
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="状 &nbsp; &nbsp; 态：" >
                    <div className="mx-3">  {isValid ? '有效' : '无效'}</div>
                </LMR >
            } as ComponentProp,
        );
        let footer = <button onClick={this.oninvalidCoupon} type="submit" className="btn btn-danger flex-grow-1 mx-3 my-1">作废</button>;
        return <Page header="优惠券详情" headerClassName={setting.pageHeaderCss} footer={footer}>
            <PropGrid className="my-2" rows={rows} values={this.coupon} alignValue="right" />
        </Page>
    })
}