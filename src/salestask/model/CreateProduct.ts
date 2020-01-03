import { Task } from './task';

export interface CreateProduct {
    task: Task;
    product: any;
    pack: any[];
    note: any;
}
