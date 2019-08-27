import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page, FA, nav } from 'tonva';
import { consts } from 'consts';

export class AgencyClause extends VPage<CStart> {

    private pa: any
    async open(param: any) {
        this.pa = param;
        await this.openPage(this.page, param);
    }

    private onAgreeAgencyClause = async () => {
        await this.controller.onAgreeAgencyClause(this.pa);
    }

    private onDisagreeAgencyClause = async () => {
        nav.showLogout();
    }

    private page = (param: any) => {
        return <Page header="温馨提示" back="none" headerClassName={consts.headerClass}>
            <div className="p-5 text-center">
                <p className="mb-5 pl-2 text-left ">

                    欢迎使用百灵威轻代理系统！<br />
                    <br />
                    <span className="px-3" ></span>在您使用百灵威轻代理系统前，请认真阅读《服务条款》，请您在同意并接受全部条款后再开始使用我们的服务。<br />

                    <br />
                    请您注意以下两点：<br />
                    <FA name="chevron-right" className="text-info small" />	我们不支持本单位在职人员违反本单位采购规定直接或间接代理本单位向百灵威的采购业务。<br />
                    <FA name="chevron-right" className="text-info small" />	百灵威保留因代理违反规则而处置收益的权力。<br />
                </p>
                <div>
                    <button className="btn btn-outline-primary w-6c mx-4" onClick={this.onDisagreeAgencyClause} >暂不同意</button>
                    <button type="button" className="btn btn-primary  mx-4" onClick={this.onAgreeAgencyClause}><span className="px-4">同意</span></button>
                </div>
            </div>
        </Page>
    }
}
