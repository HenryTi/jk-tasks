import { TVs } from "tonva";
import { common } from "./common";
import { warehouse } from "./warehouse";
import { product } from "./product";
import { salesTask } from './salesTask';

export const tvs:TVs = {
    salesTask: salesTask,
    common: common,
    warehouse: warehouse,
    product: product,
}
