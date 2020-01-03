import * as React from 'react';
import { VPage, Page, ItemSchema, StringSchema, UiSchema, UiTextItem, Edit, LMR, FA, tv } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CTeam } from './CTeam';
import { setting } from 'appConfig';

export class VTeamDetail extends VPage<CTeam> {

    private schema: ItemSchema[] = [
        { name: 'assigend', type: 'string' } as StringSchema,
    ];

    private uiSchema: UiSchema = {
        items: {
            assigend: { widget: 'text', label: '备注名', placeholder: '' } as UiTextItem,
        }
    }

    @observable private data: any;
    private peer: any;
    async open(param: any) {
        let { assigned, children } = param;
        this.peer = children;
        this.data = {
            assigend: assigned,
        };
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await this.controller.savePeerAssigned(this.peer, newValue);
        this.data[name] = newValue;
    }

    private page = observer(() => {

        let { achievement } = this.controller;
        let { oneSaleVolume } = achievement;
        let right = <div className=" h5 px-3"><FA name="cny" className="text-warning small" /> {oneSaleVolume}</div>;
        return <Page header={tv(this.peer, (v) => v.nick || v.name)} headerClassName={setting.pageHeaderCss}>
            <Edit
                schema={this.schema}
                uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged} />
            <LMR className=" bg-white pl-3 py-2"
                left={<div><span>销量</span></div>}
                right={right}>
            </LMR>
        </Page>
    })
}
