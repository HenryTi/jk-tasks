import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit, nav, userApi, LMR, FA } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';
import { setting } from 'appConfig';

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
    async open(param: any) {
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
        switch (name) {
            // case 'name': nav.user.name = newValue; break; 名字不可改变
            case 'icon': nav.user.icon = newValue; break;
            case 'nick': nav.user.nick = newValue; break;
        }
        nav.saveLocalUser();
    }

    private page = () => {

        let { inviteCode, showInvitationCode } = this.controller;

        let onshowInvitationCode = async () => await showInvitationCode(inviteCode);
        let right = <div onClick={onshowInvitationCode} >
            <FA className="fa-lg" name="qrcode" />
        </div>
        return <Page header='个人信息' headerClassName={setting.pageHeaderCss} >
            <Edit schema={this.schema} uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged}
            />
            <LMR className="d-flex px-3 py-2 bg-white align-items-center cursor-pointer"
                right={right}>
                邀请码
            </LMR>
        </Page >
    }
}