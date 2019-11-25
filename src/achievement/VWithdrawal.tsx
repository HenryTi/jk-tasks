import * as React from 'react';
import { VPage, Page, Schema, UiSchema, Context, Form, Widget, UiCustom, FA } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from '../consts';
import { CBalance } from './CBalance';
/* eslint-disable */
const schema: Schema = [
    { name: 'amount', type: 'number', required: true },
    { name: 'submit', type: 'submit' },
];

class WithdrawalAmount extends Widget {

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        if (val && !/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(val)) {
            evt.currentTarget.value = "";
        }
        this.setValue(val);
    }
    render = () => {
        return <div >
            <div className="d-flex my-2 ">
                <FA name="cny" className="h2" /><input type="text" className="mx-1" style={{ width: "100%", height: "35px" }} onChange={this.onChange} ></input>
            </div>
            <div className="small text-muted">{}</div>
        </div >
    };
}

export class VWithdrawal extends VPage<CBalance> {
    balance: number;
    private uiSchema: UiSchema = {
        items: {
            amount: {
                widget: 'custom',
                label: '提现金额',
                WidgetClass: WithdrawalAmount,
            } as UiCustom,
            submit: { widget: 'button', label: '提现', className: 'btn btn-primary w-20c' },
        }
    }

    async open(balance: number) {
        this.balance = balance;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.submitWithdrawal(context.data.amount);
    }

    private page = observer(() => {

        return <Page header="余额提现" headerClassName={consts.headerClass}>
            <div className="bg-white" style={{ width: "90%", padding: "10px 10px 10px 10px", margin: '2rem auto 0 auto' }} >
                <div className="my-3 mx-3" >转账到银行卡</div>
                <Form className="my-3 mx-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
            </div>
        </Page >
    });
}
