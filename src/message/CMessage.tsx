import { Query, PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VMessage } from './VMessage';
import { observable } from 'mobx';

class PageMessage extends PageItems<any> {

    private searchQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
export class CMessage extends CUqBase {
    @observable pageMessage: PageMessage;
    count = observable.box<number>(0);
    //初始化
    protected async internalStart(param: any) {
        //this.pageMessage = null;
        this.searchNowMessage(); // 从constructor移过来的
        await this.showMessage();
    }

    //搜索未读信息
    searchNowMessage = async () => {
        let messages = await this.uqs.salesTask.searchNowMessage.table({});
        if (messages && messages.length > 0) {
            this.count.set(messages[0].count);
        } else {
            this.count.set(0);
        }
    }

    //更新消息
    updateNowMessage = async () => {
        await this.uqs.salesTask.UpdateNowMessage.submit({});
        await this.searchNowMessage();
    }

    //显示消息
    showMessage = async () => {
        await this.searchMessage();
        this.openVPage(VMessage, this.pageMessage);
        await this.updateNowMessage();
    }

    //搜索消息
    searchMessage = async () => {
        this.pageMessage = new PageMessage(this.uqs.salesTask.searchMessage);
        await this.pageMessage.first({});
    }


}