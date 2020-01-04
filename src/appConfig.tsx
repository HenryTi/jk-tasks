import _ from 'lodash';
import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import { jnkTop, assistjnkTop } from './ui';
import { Sales } from './model/sales';

const appConfigBase: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.1.8", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: undefined,
    oem: '百灵威'
};

export const appConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: jnkTop,
});

export const assistappConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: assistjnkTop,
});

export const setting = {
    //appName: "销售助手",
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    //downloadAppurl: "http://agent.jkchemical.com/download/jk-agent.apk",
    //sharelogo: "https://agent.jkchemical.com/sharelogo.png",
    //logo: logo,
    userIcon: "",
    appUrlDomain: "assist.jkchemical.com",
    pageHeaderCss: 'bg-primary py-1',
    sales: undefined as Sales,
}
