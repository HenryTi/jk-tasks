
import { observable, computed } from 'mobx';

export class ProductCart {

    @observable list: any[] = [];
    @observable listid: any[] = [];
    @computed get count(): number {

        return this.list.length;
    }

    add(product: any, productid: any) {

        let index = this.listid.indexOf(productid);
        if (index === -1) {
            this.listid.push(productid);
            this.list.push(product);
        }
    }

    remove(productid: any) {
        let index = this.listid.findIndex(v => v === productid);
        if (index >= 0) this.listid.splice(index, 1);
        if (index >= 0) this.list.splice(index, 1);
    }

    clearAll() {
        this.listid.splice(0, this.list.length);
        this.list.splice(0, this.list.length);
    }

    getIds(): string {

        let reuslt: string = "";
        this.listid.forEach(element => {
            reuslt += element + '|';
        });
        return reuslt;
    }
}
