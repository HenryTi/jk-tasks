import _ from 'lodash';
import { ProductPackRow } from './Product';
import { Loader } from '../mainSubs/loader';
import { MainSubs, MainProductChemical, MainBrand } from '../mainSubs';
import { LoaderProductChemical } from './productChemical';
import { GLOABLE } from 'ui';

export class LoaderBrand extends Loader<MainBrand> {
    //private brandTuid: Tuid;

    /*
    protected initEntities() {
        let { cUqProduct } = this.cApp;
        this.brandTuid = cUqProduct.tuid('brand');
    }
    */

    protected async loadToData(brandId: number, data: MainBrand): Promise<void> {
        let brand = await this.cApp.uqs.product.Brand.load(brandId);
        data.id = brand.id;
        data.name = brand.name;
    }

    protected initData(): MainBrand {
        return {} as MainBrand;
    }
}

export class LoaderProductWithChemical extends Loader<MainProductChemical> {
    /*
    private productTuid: Tuid;

    protected initEntities() {

        let { cUqProduct } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
    }
    */

    protected async loadToData(productId: number, data: MainProductChemical): Promise<void> {

        let product = await this.cApp.uqs.product.ProductX.load(productId);
        if (product === undefined)
            return;
        _.merge(data, product);

        let brandLoader = new LoaderBrand(this.cApp);
        data.brand = await brandLoader.load(data.brand.id);

        let productChemicalLoader = new LoaderProductChemical(this.cApp);
        let productChemical: any = await productChemicalLoader.load(productId);
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            data.chemical = chemical;
            data.purity = purity;
            data.CAS = CAS;
            data.molecularFomula = molecularFomula;
            data.molecularWeight = molecularWeight;
        }

        data.packs = [];
        product.packx.forEach((e: any) => {
            // let { id, radiox, radioy, unit } = e;
            data.packs.push(e);
        });
    }

    protected initData(): MainProductChemical {
        return {} as MainProductChemical;
    }
}

export class LoaderProductChemicalWithPrices extends Loader<MainSubs<MainProductChemical, ProductPackRow>> {
    /*
    private priceMap: Map;
    private agentPriceMap: Map;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;
    private getPromotionPackQuery: Query;

    protected initEntities() {

        let { cUqProduct, cUqWarehouse, cUqPromotion } = this.cApp;
        this.priceMap = cUqProduct.map('pricex');
        this.agentPriceMap = cUqProduct.map('AgentPrice');
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
        this.getPromotionPackQuery = cUqPromotion.query("getPromotionPack");
    }
    */

    protected initData(): MainSubs<MainProductChemical, ProductPackRow> {
        return { main: {} as MainProductChemical, subs: [] as ProductPackRow[] };
    }

    protected async loadToData(productId: any, data: MainSubs<MainProductChemical, ProductPackRow>): Promise<void> {
        let uqProduct = this.cApp.uqs.product;
        let { product, promotion } = this.cApp.uqs;
        let productLoader = new LoaderProductWithChemical(this.cApp);
        data.main = await productLoader.load(productId);

        let discount = 0;
        let { currentSalesRegion, currentLanguage } = this.cApp;


        let { id: currentSalesRegionId } = currentSalesRegion;
        let prices = await product.PriceX.table({ product: productId, salesRegion: currentSalesRegionId });
        let agentprices = await uqProduct.AgentPrice.table({ product: productId, salesRegion: GLOABLE.SALESREGION_CN });
        data.subs = prices.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).sort((a, b) => a.retail - b.retail).map(element => {
            let ret: any = {};
            ret.pack = element.pack;
            ret.retail = element.retail;
            if (discount !== 0)
                ret.vipPrice = Math.round(element.retail * (1 - discount));
            ret.currency = currentSalesRegion.currency;
            return ret;
        });

        let promises: PromiseLike<any>[] = [];
        data.subs.forEach(v => {
            promises.push(promotion.GetPromotionPack.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
        })
        let results = await Promise.all(promises);

        for (let i = 0; i < data.subs.length; i++) {
            let promotion = results[i];
            let discount = promotion && promotion.discount;

            if (discount)
                data.subs[i].promotionPrice = Math.round((1 - discount) * data.subs[i].retail);

            for (let j = 0; j < agentprices.length; j++) {
                let pid = agentprices[j].pack.id;
                let pidx = data.subs[i].pack.id;
                if (pidx === pid) {
                    data.subs[i].agentPrice = agentprices[j].agentPrice;
                }
            }
        }
    }

    getagentPrices = async (agents: any[], pack: any) => {
        for (let i = 0; i < agents.length; i++) {
            let { pack: packid, agentprice } = agents[i];
            if (packid === pack) {
                return agentprice;
            }
        }
    }

}

/*
// 拟用 LoaderProduct 替换
export class ProductService {

private cApp: CCartApp;
private productTuid: TuidMain;
private productChemicalMap: Map;

constructor(cApp: CCartApp) {
    this.cApp = cApp;
    this.initEntities();
}

protected initEntities() {

    let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
    this.productTuid = cUqProduct.tuid('productx');
    this.productChemicalMap = cUqProduct.map('productChemical');
}

async loadProductChemical(productId: number): Promise<MainProductChemical> {

    let result: MainProductChemical;
    let product = await this.productTuid.load(productId);
    result = {...product };

    let productChemical = await this.productChemicalMap.obj({ product: productId });
    if (productChemical) {
        let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
        result.chemical = chemical;
        result.purity = purity;
        result.CAS = CAS;
        result.molecularFomula = molecularFomula;
        result.molecularWeight = molecularWeight;
    }
    return result;
}
}
*/