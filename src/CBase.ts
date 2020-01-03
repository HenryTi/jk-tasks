import { CSub, CBase } from "tonva";
import { UQs } from "./uqs";
import { CApp } from "CApp";

export abstract class CUqBase extends CBase {
    get cApp(): CApp { return this._cApp }
    protected get uqs(): UQs { return this._uqs };
}

export abstract class CUqSub extends CSub {
    get cApp(): CApp { return this._cApp }
    protected get uqs(): UQs { return this._uqs };
    protected get owner(): CUqBase { return this._owner as CUqBase };
}
