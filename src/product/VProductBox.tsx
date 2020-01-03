import * as React from 'react';
import { observer } from 'mobx-react';
import { tv, FA } from 'tonva';
import { VPage, Page, List } from 'tonva';
import { CProduct } from './CProduct';
import { ProductImage } from '../tools/productImage';
import { setting } from 'appConfig';

export class VProductBox extends VPage<CProduct> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
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


    private renderProduct = (product: any, index: number) => {
        let { id, brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product.main;
        let { productCart } = this.controller.cApp;
        let onremove = () => productCart.remove(id);
        return <div className="d-block mb-4 px-2" >
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
            <div className="w-100 d-flex justify-content-end" >
                <span onClick={onremove} className="text-info mx-3"><FA name="trash" /></span>
            </div>
        </div>
    }

    private onScrollBottom = async () => {
        await this.controller.pageProduct.more();
    }

    private page = observer((product: any) => {

        let { productCart, cCoupon } = this.controller.cApp;
        let param = { paramtype: "productlist", product: productCart.getIds() };
        let onShareProduct = async () => await cCoupon.showCreateCoupon(param);

        let productlist = productCart.list;
        let footer = <div className="d-block">
            <div className="w-100  justify-content-end" >
                <button type="button" className="btn btn-primary mx-1 my-1 px-4" onClick={onShareProduct}>分享</button>
            </div>
        </div>;

        return <Page header='产品框' onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} footer={footer} >
            {
                productlist && productlist && (productlist.length > 0) &&
                <List before={''} none="无产品" items={productlist} item={{ render: this.renderProduct, onClick: null }} />
            }
        </Page>
    })
}