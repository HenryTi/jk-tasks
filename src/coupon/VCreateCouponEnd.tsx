import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, Image } from 'tonva';
import { CCoupon } from './CCoupon';
import copy from 'copy-to-clipboard';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';
import { setting } from 'appConfig';
import QRCode from 'qrcode.react';

export class VCreateCouponEnd extends VPage<CCoupon> {

    @observable showTips: any = "none"
    inviteParam: any;

    async open(param: any) {
        this.inviteParam = param;
        this.openPage(this.page);
    }
    comeBack = () => {
        this.closePage(2);
    }

    copyClick = (e: any) => {
        copy(e.target.parentNode.childNodes[0].innerHTML)
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }

    share = async (url: any) => {

        if (navigator.userAgent.indexOf("Html5Plus") > -1) {

            let { paramtype, discount } = this.inviteParam;
            // @ts-ignore  屏蔽错误 
            window.plusShare({
                title: setting.sales.shareTitle(paramtype),//应用名字  
                content: setting.sales.shareContent(discount),
                href: url,//分享出去后，点击跳转地址 
                //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                thumbs: [setting.sales.sharelogo] //分享缩略图  
            }, function (result) {
                //分享回调  
            });
            this.controller.cApp.productCart.clearAll();
        }
    }

    private page = observer(() => {
        var inviteCode = "";
        let { code } = this.inviteParam;
        if (code) {
            code = String(code);
            let p1 = code.substr(0, 4);
            let p2 = code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }

        let { productCart } = this.controller.cApp;
        let ids = productCart.getIds();
        let url = setting.sales.shareUrl(code, ids);
        let onshare = () => this.share(url);
        let share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
        </div>;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            share = <span className="text-info cursor-info mx-2" onClick={onshare} >分享</span>;
        }

        let header = setting.sales.couponHeader;
        return <Page header={header} headerClassName={setting.pageHeaderCss}>
            <div id="qrid" className="text-center" style={{ width: 'auto', height: '85%' }}  >
                <Image src={setting.sales.logo} className="mt-4" style={{ width: 'auto', height: '40%', margin: '2rem auto, 0 auto' }} />
                <div>
                    < QRCode style={{ margin: '2rem 0 0 0' }}
                        value={url}  //value参数为生成二维码的链接
                        size={100} //二维码的宽高尺寸
                        fgColor="#000000"  //二维码的颜色
                    />
                    <div className="mt-4">
                        <span className="w-100 text-center h3 m-3 text-info">{inviteCode} </span>
                    </div>
                </div>
            </div>
            <div className="w-100 text-center">

            </div>
            <div className="w-100 text-center">
                <span className="text-info cursor-info mx-2" onClick={this.copyClick}>复制</span>
                <span className="text-info cursor-info mx-2" onClick={this.comeBack} >返回</span>
                {share}
                <div className="text-center text-white small px-2" style={{ width: '30%', margin: '-80px  auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>已复制到剪切板</div>
            </div>
        </Page>
    })
}