import { Entity } from 'tonva';
import { CSalesTaskApp } from 'CSalesTaskApp';

export abstract class Loader<T> {
    protected cApp: CSalesTaskApp;
    private entities: Entity[] = [];
    private schemaLoaded: boolean = false;
    constructor(cApp: CSalesTaskApp) {
        this.cApp = cApp;
        this.initEntities();
    }

    protected abstract initEntities(): void;

    protected async loadSchemas() {
        if (this.schemaLoaded === true) return;
        await Promise.all(this.entities);
        this.schemaLoaded = true;
    }

    async load(param: any): Promise<T> {
        await this.loadSchemas();
        let data = this.initData();
        await this.loadToData(param, data);
        return data;
    }
    protected abstract async loadToData(param: any, data: T): Promise<void>;
    protected abstract initData(): T;
}
