import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit, nav, userApi, LMR, FA } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';

export class VMeDetail extends VPage<CMe> {

    private schema: ItemSchema[] = [
        { name: 'icon', type: 'image' } as ImageSchema,
        { name: 'nick', type: 'string' } as StringSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            icon: { widget: 'image', label: '头像' } as UiImageItem,
            nick: { widget: 'text', label: '昵称', placeholder: '好的别名更方便记忆' } as UiTextItem,
        }
    }

    @observable private data: any;
    async open(position: any) {
        let { nick, icon } = nav.user;
        this.data = {
            nick: nick,
            icon: icon,
        };
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await userApi.userSetProp(name, newValue);
        this.data[name] = newValue;
        nav.user[name] = newValue;
    }

    private page = () => {

        return <Page header='个人信息' headerClassName='bg-primary py-1' >
            <Edit schema={this.schema} uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged}
            />
            <LMR className="d-flex px-3 py-2 bg-white align-items-center cursor-pointer"
                right={this.controller.inviteCode}>
                邀请码
            </LMR>
        </Page >
    }
}