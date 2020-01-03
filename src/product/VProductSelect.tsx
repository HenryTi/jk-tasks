import * as React from 'react';
import { VPage, Page, List, SearchBox, tv } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from '../tools/productImage';
import { CProduct } from './CProduct';
import { setting } from 'appConfig';


export class VProductSelect extends VPage<CProduct> {

    private createproduct: any;
    async open(createproduct: any) {
        this.createproduct = createproduct;
        this.openPage(this.page, createproduct);
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
        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
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

    private onScrollBottom = async () => {
        await this.controller.pageProduct.more();
    }

    private onSelectItem = async (product: any) => {
        let { showPorductSelectDetail } = this.controller.cApp.cSalesTask;
        this.createproduct.product = product;
        showPorductSelectDetail(this.createproduct);
    }

    private page = observer((product: any) => {
        let { pageProduct } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">未搜索到产品</div>;

        return <Page header='添加产品' onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss}>
            <SearchBox className="px-1 w-100  mt-2 mr-2 "
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索品名、编号、CAS、MDL等" />
            <List before={''} none={none} items={pageProduct} item={{ render: this.renderProduct, onClick: this.onSelectItem }} />
        </Page>
    })
}