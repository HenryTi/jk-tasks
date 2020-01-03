import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Query, tv, PageItems, BoxId } from 'tonva';
import { CUqBase } from '../CBase';
import { ProductImage } from '../tools/productImage';
import { VProductSelect } from './VProductSelect';
import { VProductList } from './VProductList';
import { VProductDetail } from './VProductDetail';
import { LoaderProductChemicalWithPrices } from './item';
import { VProductPackSelect } from './VProductPackSelect';
import classNames from 'classnames';
import { VProductDelivery } from './VProductDelivery';
import { VProductBox } from './VProductBox';

//页面类
class PageProduct extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.seq;
    }
}

/**
 *
 */
export class CProduct extends CUqBase {
    //cApp: CApp;
    @observable pageProduct: PageProduct;
    @observable customerlist: any;

    @observable inventoryAllocationContainer: { [packId: number]: any[] } = {};
    @observable futureDeliveryTimeDescriptionContainer: { [productId: number]: string } = {};
    @observable chemicalInfoContainer: { [productId: number]: any } = {};

    //初始化
    protected async internalStart(param: any) {
        this.pageProduct = null;
        this.openVPage(VProductSelect, param);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageProduct = new PageProduct(this.uqs.product.SearchProduct);
        await this.pageProduct.first({ keyWord: key, salesRegion: 1 });
    }

    //选择客户--给调用页面返回客户id
    returnProduct = async (product: any): Promise<any> => {
        this.returnCall(product);
    }

    //显示产品明细
    showProductDetail = async (param: any): Promise<any> => {
        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let product = await loader.load(param.id);
        this.openVPage(VProductDetail, product)
    }

    //显示选择产品
    showProductSelect = async (product: any): Promise<any> => {
        this.openVPage(VProductSelect, product)
    }

    //显示选择包装
    showProductPackSelect = async (product: any): Promise<any> => {
        this.openVPage(VProductPackSelect, product)
    }

    //显示货期
    renderDeliveryTime = (pack: BoxId) => {
        return this.renderView(VProductDelivery, pack);
    }
    //货期库存信息
    getInventoryAllocation = async (productId: number, packId: number, salesRegionId: number) => {
        if (this.inventoryAllocationContainer[packId] === undefined)
            this.inventoryAllocationContainer[packId] = await this.uqs.warehouse.GetInventoryAllocation.table({ product: productId, pack: packId, salesRegion: this.cApp.currentSalesRegion });
    }
    //交货期说明
    getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        if (this.futureDeliveryTimeDescriptionContainer[productId] === undefined) {
            let futureDeliveryTime = await this.uqs.product.GetFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
            if (futureDeliveryTime.length > 0) {
                let { minValue, maxValue, unit } = futureDeliveryTime[0];
                this.futureDeliveryTimeDescriptionContainer[productId] = minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
            } else {
                this.futureDeliveryTimeDescriptionContainer[productId] = null;
            }
        }
    }

    //显示产品框

    showProductBox = () => {
        this.openVPage(VProductBox);
    }

    render = observer(() => {
        this.pageProduct = null;
        return this.renderView(VProductList);
    })

    tab = () => {
        return <this.render />;
    }
}


export function renderBrand(brand: any) {
    return productPropItem('品牌', brand.name);
}

export function productPropItem(caption: string, value: any, captionClass?: string) {
    if (value === null || value === undefined || value === '0') return null;
    let capClass = captionClass ? classNames(captionClass) : classNames("text-muted");
    let valClass = captionClass ? classNames(captionClass) : "";
    return <>
        <div className={classNames("col-6 col-sm-2 pr-0 small", capClass)}> {caption}</div>
        <div className={classNames("col-6 col-sm-4", valClass)}>{value}</div>
    </>;
}

export function renderProduct(product: any, index: number) {
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
                    {productPropItem('CAS', CAS)}
                    {productPropItem('纯度', purity)}
                    {productPropItem('分子式', molecularFomula)}
                    {productPropItem('分子量', molecularWeight)}
                    {productPropItem('产品编号', origin)}
                    {tv(brand, renderBrand)}
                </div>
            </div>
        </div>
    </div>

}
