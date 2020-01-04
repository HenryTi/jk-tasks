import { CAppBase, IConstructor, nav } from "tonva";
import { CSalesTask } from './salestask';
import { CCustomer } from './customer/CCustomer';
import { CProduct } from './product/CProduct';
import { CMe } from './me/CMe';
import { CStart } from './start/CStart';
import { CTeam } from './team/CTeam';
import { CMessage } from './message/CMessage';
import { CCustomerUnit } from './customerunit/CCustomerUnit';
import { CCoupon } from './coupon/CCoupon';
import { CInnerCustomer } from './innercustomer/CInnerCustomer';

import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VHome, GLOABLE } from './ui';
import { ProductCart } from "model/productcart";
import { CBalance } from "achievement/CBalance";
import { setting } from "appConfig";
import { AssistSales, AgentSales } from "model/sales";
import { CPost } from "post/CPost";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };

    currentSalesRegion: any;
    currentLanguage: any;
    productCart: ProductCart;

    /** 定义 Conctorlle*/
    cSalesTask: CSalesTask;
    cCustomer: CCustomer;
    cProduct: CProduct;
    cMe: CMe;
    cTeam: CTeam;
    cStart: CStart;
    cMessage: CMessage;
    cCustomerUnit: CCustomerUnit;
    cCoupon: CCoupon;
    cWebUser: CInnerCustomer;
    cBalance: CBalance;
    cPost: CPost;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        //根据网址判断是什么APP
        if (document.domain === setting.appUrlDomain) {
            setting.sales = new AssistSales(this);
        } else {
            setting.sales = new AgentSales(this);
        }


        this.currentSalesRegion = await this.uqs.common.SalesRegion.load(GLOABLE.SALESREGION_CN);
        this.currentLanguage = await this.uqs.common.Language.load(GLOABLE.CHINESE);
        this.productCart = new ProductCart();


        this.cCustomer = this.newC(CCustomer);
        this.cProduct = this.newC(CProduct);
        this.cSalesTask = this.newC(CSalesTask);
        this.cMe = this.newC(CMe);
        this.cTeam = this.newC(CTeam);
        this.cStart = this.newC(CStart);
        this.cMessage = this.newC(CMessage);
        this.cCustomerUnit = this.newC(CCustomerUnit);
        this.cCoupon = this.newC(CCoupon);
        this.cWebUser = this.newC(CInnerCustomer);
        this.cBalance = this.newC(CBalance);
        this.cPost = this.newC(CPost);

        /** 启动销售任务列表*/
        //this.cSalesTask.start();

        /** 启动邀请码页面 */
        this.cStart.start();

        /**计算业绩**/
        //await this.cMe.onComputeAchievement();

        /** 启动主程序*/
        //await super.internalStart(param);

        nav.clear();
        this.openVPage(VHome);
    }
}
