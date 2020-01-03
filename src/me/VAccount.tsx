import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit, FA } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../appConfig';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';
import { observer } from 'mobx-react';


export class VAccount extends VPage<CMe> {

    private schema: ItemSchema[] = [
        { name: 'telephone', type: 'string' } as StringSchema,
        { name: 'identityname', type: 'string' } as StringSchema,
        { name: 'identitycard', type: 'string' } as StringSchema,
        { name: 'subbranchbank', type: 'string' } as StringSchema,
        { name: 'bankaccountnumber', type: 'string' } as StringSchema,
        { name: 'identityicon', type: 'image' } as ImageSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            identityname: { widget: 'text', label: '姓名', placeholder: '' } as UiTextItem,
            identityicon: { widget: 'image', label: '证件照', size: 'lg' } as UiImageItem,
            subbranchbank: { widget: 'text', label: '开户行', placeholder: '' } as UiTextItem,
            bankaccountnumber: { widget: 'text', label: '银行账号', placeholder: '' } as UiTextItem,
            telephone: { widget: 'text', label: '手机', placeholder: '' } as UiTextItem,
            identitycard: { widget: 'text', label: '身份证号', placeholder: '' } as UiTextItem,
        }
    }

    @observable showTipss: any = "none"
    @observable private data: any;
    async open(param: any) {
        this.data = param;
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.data[name] = newValue;
        await this.controller.saveAccount(this.data);
    }

    private affirm = () => {
        let { telephone, identityname, identitycard, identityicon, subbranchbank, bankaccountnumber } = this.data;
        if (telephone && identityname && identitycard && identityicon && subbranchbank && bankaccountnumber) {
            this.closePage();
        } else {
            this.showTipss = "";
            setTimeout(() => {
                this.showTipss = "none";
            }, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private page = observer(() => {
        let footer = <div className="d-block">
            <div className="w-100 justify-content-end" >
                <button type="button" className="btn btn-primary mx-3" style={{ padding: "6px 40px 6px 40px" }} onClick={this.affirm}>确定</button>
            </div>
        </div>
        return <Page header='账户' headerClassName={setting.pageHeaderCss} footer={footer} >
            <div className="small mx-3 my-2">
                <span className="pr-2 text-danger ">※</span> 首次开展业务前需要绑定银行账号和身份<FA className="px-2 text-danger " name="exclamation-circle"></FA>
            </div>
            <Edit schema={this.schema} uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged}
            />
            <div className="text-center text-white small px-2" style={{ width: '40%', margin: '10px auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTipss }}>信息还没有补充完整</div>
        </Page >

    })
}