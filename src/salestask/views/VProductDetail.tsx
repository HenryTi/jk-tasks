import * as React from 'react';
import { VPage, Page, tv, List } from 'tonva';
import { observer } from 'mobx-react';
import { CSalesTask } from '../CSalesTask';
import { ProductImage } from '../../tools/productImage';
import { setting } from 'appConfig';


export class VProductDetail extends VPage<CSalesTask> {
    private products: any[];

    async open(param: any) {

        this.products = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return this.render();
    });

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
    private renderItem = (param: any, index: number) => {
        //param.product.assure();
        //let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = param.product.obj;
        return tv(param.product, (product) => {
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
        });
    }

    render() {
        let none = <div className="my-3 mx-2 text-muted">无产品</div>;
        return <Page header="产品详情" headerClassName={setting.pageHeaderCss}>
            <div>
                <List before="" none={none} items={this.products} item={{ render: this.renderItem }} />
            </div>
        </Page >
    }
}