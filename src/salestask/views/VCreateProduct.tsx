import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context, tv } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from '../../tools/productImage';
import { CreateProduct } from '../model';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';
//f8a905

const schema: Schema = [
    { name: 'note', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VCreateProduct extends VPage<CSalesTask> {

    private uiSchema: UiSchema = {
        items: {
            note: { widget: 'textarea', label: '备注', placeholder: '' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    private form: Form;
    private createproduct: CreateProduct
    async open(param: CreateProduct) {
        this.createproduct = param;
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });


    private onCreateTaskProduct = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        this.createproduct.note = context.data.note;
        await this.controller.createTaskProduct(this.createproduct);
        this.closePage(2);
    }

    private renderBrand = (brand: any) => {
        return this.productPropItem('品牌', brand.name);
    }

    private productPropItem = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4 col-lg-8">{value}</div>
        </>;
    }

    private productItem = (param: CreateProduct) => {
        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = param.product;
        return <div className="d-block mb-4 px-2">
            <div className="py-2">
                <div><strong>{description}</strong></div>
                <div>{descriptionC}</div>
            </div>
            <div className="row">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {this.productPropItem('CAS', CAS)}
                        {this.productPropItem('纯度', purity)}
                        {this.productPropItem('分子式', molecularFomula)}
                        {this.productPropItem('分子量', molecularWeight)}
                        {this.productPropItem('产品编号', origin)}
                        {tv(brand, this.renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    }

    render(param: CreateProduct) {
        return <Page header="添加产品" footer={null} headerClassName={setting.pageHeaderCss}>
            <div className="mx-3">
                {this.productItem(param)}
                <Form ref={v => this.form = v}
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
                <button type="button" className="btn btn-primary w-100" onClick={this.onCreateTaskProduct} >添加</button>
            </div>
        </Page >
    }
}