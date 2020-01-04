import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, tv, LMR } from 'tonva';
import { CPost } from './CPost';
import { setting } from 'appConfig';
/* eslint-disable */
export class VPostDetil extends VPage<CPost> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    private page = observer((product: any) => {

        let { current, showCustomer } = this.controller;
        let { id, caption, content, image, template, discription } = current;
        let tvImage = tv(image, (values) => { return <div className="border p-2"><img className="w-3c h-3c" src={values.path} /></div>; });

        let footer = < div className="flex-grow-1 align-self-center justify-content-end" >
            <button type="button" className="btn btn-primary mx-3 align-self-center" onClick={() => showCustomer("", id)}  >分享给客户</button>
        </div >;

        return <Page header="帖文内容" headerClassName={setting.pageHeaderCss} footer={footer}  >
            <div className="p-3">
                <div className="small text-muted p-1">标题</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{caption}</div>

                <div className="small text-muted p-1">链接描述</div>
                <LMR className="mb-3 bg-white px-3 h6" right={tvImage}>
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1">内容</div>
                <pre className="mb-3 px-3 py-4 bg-white h6 border">{content}</pre>
                <div className="small text-muted p-1">布局模板</div>
                <div className="mb-3 px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
            </div>

        </Page>;
    })

}