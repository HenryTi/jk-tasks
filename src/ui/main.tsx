import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, Image } from 'tonva';
import { observable } from 'mobx';
import { CApp } from 'CApp';
import { setting } from 'appConfig';
/* eslint-disable */
const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VHome extends VPage<CApp> {
    async open(param?: any) {
        this.calcSum();
        this.openPage(this.render);
    }

    opensrc = () => {
        window.open(setting.sales.downloadAppurl);
    }

    render = (param?: any): JSX.Element => {
        let { cSalesTask, cCustomer, cProduct, cMe, cMessage } = this.controller;
        let faceTabs: any[] = [
            { name: 'home', label: '任务', content: cSalesTask.tab, icon: 'tasks', notify: undefined/*store.homeCount*/ },
            { name: 'member', label: '客户', content: cCustomer.tab, icon: 'vcard' },
            { name: 'member', label: '产品', content: cProduct.tab, icon: 'gift' },
            { name: 'member', label: '我的', content: cMe.tab, icon: 'user', load: cMe.load, notify: cMessage.count },
        ].map(v => {
            let { name, label, icon, content, notify, load } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
                load: load,
            }
        });

        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1,                            //IE内核
                    presto: u.indexOf('Presto') > -1,                              //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1,                         //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,    //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/),                    //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),               //ios终端
                    android: u.indexOf('Android') > -1, //android终端或者uc浏览器
                    uc: u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1,                              //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1,                                  //是否iPad
                    webApp: u.indexOf('Safari') == -1,                             //是否web应该程序，没有头部与底部
                    html5Plus: u.indexOf('Html5Plus') > -1                      //是否微信 （2015-01-22新增）
                };
            }()
        };

        let header: any = false;
        if (!browser.versions.html5Plus && browser.versions.android) {
            header = <div className="w-100 mx-3 d-flex  justify-content-between">
                <div>
                    <Image src={setting.sales.logo} style={{ width: "25px", height: "25px" }} ></Image>
                    <span className="small mx-2" >{setting.sales.appName}APP</span>
                </div >
                <div>  <a download onClick={this.opensrc} className="small">立即打开</a></div>
            </div >;
        }

        return <Page header={header} headerClassName={"bg-info"}>
            <Tabs tabs={faceTabs} />
        </Page >;
    }


    count = observable.box<number>(0);
    protected calcSum = () => {
        this.count.set(0);
    }
}
