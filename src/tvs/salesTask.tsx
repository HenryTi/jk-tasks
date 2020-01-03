import * as React from 'react';
import { tv } from 'tonva';

const tvSalestask = (values: any) => {
    let { desciption, customer, type, sourceid } = values;
    return <>
        {tv(desciption)}{tv(customer)}{tv(type)}{tv(sourceid)}
    </>
};

const tvUnit = (values: any) => {
    return <>{values.name}</>;
}

const tvMyCustomer = (values: any) => {
    return <>{values.name}</>;
}


export const salesTask = {
    salesTask: tvSalestask,
    myCustomerUnit: tvUnit,
    myCustomer: tvMyCustomer,
}