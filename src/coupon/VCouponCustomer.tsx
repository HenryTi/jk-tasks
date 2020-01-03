import * as React from 'react';
import * as _ from 'lodash';
import { VPage, Page, LMR, SearchBox, FA, List, EasyDate, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { setting } from 'appConfig';

export class VCouponCustomer extends VPage<CCoupon> {

    private coupon: any;
    async open(param: any) {
        this.coupon = param;
        this.openPage(this.page);
    }

    private renderItem = (coupon: any, index: number) => {
        let customer = coupon.customer;
        return <>
            {
                tv(customer, v =>
                    <LMR className="px-3 py-2" left={<div className=" font-weight-bold mx-3">{v.name}</div>} right={<div className="text-muted mx-3"><small>{tv(v.unit, s => s.name)}</small></div>}></LMR >
                )
            }
        </>
    }

    private page = observer(() => {
        let { showAddCouponCustomer, customers } = this.controller;
        //let onshowAddCouponCustomer = async () => await showAddCouponCustomer();
        //let right = <div onClick={onshowAddCouponCustomer} className="cursor-pointer py-2"><FA name="plus" /></div>;
        let none = <div className="my-3 mx-2 text-warning">无客户</div>;

        return <Page header='指定客户' headerClassName={setting.pageHeaderCss} right={null} >
            <List before={''} none={none} items={customers} item={{ render: this.renderItem, onClick: null }} />
        </Page>
    })
}
