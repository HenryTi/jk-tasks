import * as React from 'react';
import { VPage, Page, ItemSchema, ObjectSchema, NumSchema, tv, UiSchema, Form } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from '../../tools/productImage';
import { MainProductChemical } from '../../model/product';
import { ViewMainSubs } from '../../mainSubs';
import { renderBrand } from '../../product/CProduct';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';
import { ProductPackRow } from 'product/Product';
/* eslint-disable */
const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'promotionPrice', type: 'number' } as NumSchema,
    { name: 'currency', type: 'string' },

];

export class VCreateProductPack extends VPage<CSalesTask> {
    private product: MainProductChemical;
    private pack: any[] = [];

    async open(product: any) {
        this.product = product.main;
        this.openPage(this.page, product);
    }

    private renderProduct = (product: MainProductChemical) => {

        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return <div className="mb-3 px-2">
            <div className="py-2"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
            <div className="row mt-3">
                <div className="col-sm-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        {this.item('CAS', CAS)}
                        {this.item('纯度', purity)}
                        {this.item('分子式', molecularFomula)}
                        {this.item('分子量', molecularWeight)}
                        {this.item('产品编号', origin)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private item = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4">{value}</div>
        </>;
    }

    private arrTemplet = (item: any) => {
        let { pack, retail, promotionPrice, inventoryAllocation, futureDeliveryTimeDescription } = item;
        let right = null;
        if (retail) {
            let price: number = promotionPrice;
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>￥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">￥ <span className="h5">{price}</span></span>
                </div>
            </div >
        } else {
            right = <small>请询价</small>
        }

        let deliveryTimeUI = <></>;
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v: any, index: number) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                return <div key={index} className="text-success">
                    {tv(warehouse, (values: any) => <>{values.name}</>)}: {quantity}
                    {deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI = <div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>
        }
        return <div className="px-2">
            <div className="row">
                <div className="col-6">
                    <div><input type="checkbox" name="productpack" onChange={this.onChangePack} value={pack.id} ></input><b>{tv(pack, v => <div>{v.radioy}{v.unit}</div>)}</b></div>
                    <div>{deliveryTimeUI}</div>
                </div>
                <div className="col-6">
                    {right}
                </div>
            </div>
        </div >;
    }

    private onChangePack = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let { value, checked } = evt.currentTarget;
        if (checked) {
            this.addArr(value);
        } else {
            this.removeArr(value);
        }
    }

    private removeArr(item: any) {
        for (var i = 0; i < this.pack.length; i++) {
            if (this.pack[i] == item) {
                this.pack.splice(i, 1);
                i--;
            }
        }
    }

    private addArr(item: any) {
        this.pack.push(item);
    }


    private uiSchema: UiSchema = {
        Templet: this.arrTemplet,
    };

    private renderPack = (pack: ProductPackRow) => {
        return <>
            <div className="sep-product-select" />
            <Form className="my-3" schema={schema} uiSchema={this.uiSchema} formData={pack} />
        </>;
    }

    private onCreateTaskProductPack = async (model: any) => {
        let { createTaskProjectPack, createproduct } = this.controller;
        createproduct.pack = this.pack;
        await createTaskProjectPack(createproduct);

    }

    private page = observer((product: any) => {

        let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
        viewProduct.model = product;
        return <Page header={"添加产品包装"} headerClassName={setting.pageHeaderCss}>
            <div className="px-2 py-2 bg-white mb-3">{viewProduct.render()}</div>
            <button type="button" className="btn btn-primary w-100" onClick={this.onCreateTaskProductPack} >添加</button>
        </Page>
    })
}