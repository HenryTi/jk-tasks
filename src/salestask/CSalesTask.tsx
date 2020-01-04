import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { FA, nav } from 'tonva';
import { CUqBase } from '../CBase';
import { LoaderProductChemicalWithPrices } from '../product/item';
import { VMain } from './views/VMain';
import { createTaskTypes } from '../salestask/types/createTypes';
import { VSalesTaskExtension } from './views/VSalesTaskExtension';
import { VTaskHistory } from './views/VTaskHistory';
import { CSelectType } from './type';
import { Task, CreateProduct } from './model';
import { Tasks } from './model/tasks';
import { VSalesTaskInvalid } from './views/VSalesTaskInvalid';
import { VEmployeeHistory } from './views/VEmployeeHistory';
import { VCustomerHistory } from './views/VCustomerHistory';
import { CSelectBiz } from './type/CSelectBiz';
import { VCreateCheck } from './views/VCreateCheck';
import { VCreateProduct } from './views/VCreateProduct';
import { VProductDetail } from './views/VProductDetail';
import { VCreateProject } from './views/VCreateProject';
import { VProjectDetail } from './views/VProjectDetail';
import { VCreateProductPack } from './views/VCreateProductPack';
import { VProductPackDetail } from './views/VProductPackDetail';
import { VCreateTask } from './views/VCreateTask';
import { CCommonType } from './types/commonType';
import { CType } from './types/CType';
import { VCreateTaskOfCustomer } from './views/VCreateTaskOfCustomer';

/* eslint-disable */
export class CSalesTask extends CUqBase {
    private taskTypes: { [type: string]: CType } = {};

    //cApp: CApp;
    cSelectType: CSelectType;
    cSalesTaskBiz: CSelectBiz;

    @observable tasks: Tasks;
    @observable createproduct: CreateProduct;

    //初始化
    protected async internalStart(param: any) {
        this.cSelectType = this.newSub(CSelectType);
        this.cSalesTaskBiz = this.newSub(CSelectBiz);

        this.taskTypes = createTaskTypes(this);

        await this.searchTaskByKey(0);
    }

    //搜索开始------------------------------------------------
    //搜索所有未处理任务
    searchTaskByKey = async (key: any) => {
        let tasks = await this.uqs.salesTask.SearchTask.table({ customer: key });
        this.tasks = new Tasks(tasks);
    }
    //搜索单个任务
    loadTask = async (taskid: number) => {
        let task = await this.uqs.salesTask.Task.load(taskid);
        task.fields = await this.searchTaskCompletion(taskid);
        return task;
    }
    //搜索处理结果的记录
    searchTaskCompletion = async (taskid: number) => {
        return await this.uqs.salesTask.SearchTaskCompletion.table({ taskid: taskid });
    }

    //显示任务沟通记录
    showTaskHistory = async (taskid: number) => {
        let tasks = await this.uqs.salesTask.SearchHistoryTask.table({ taskid: taskid });
        this.openVPage(VTaskHistory, { tasks: tasks });
    }

    /**
     * "我"的已完成任务
     */
    showMyTasksCompleted = async () => {
        let tasks = await this.uqs.salesTask.SearchHistoryTaskByEmployee.table({});
        this.openVPage(VEmployeeHistory, tasks);
    }

    /**
     * 显示客户沟通记录
     */
    showCustomerHistory = async (customerid: number) => {
        let tasks = await this.uqs.salesTask.SearchHistoryTaskByCustomer.table({ customerid: customerid });
        this.openVPage(VCustomerHistory, tasks);
    }

    //获取类型的图表
    getTaskIcon(typeName: string) {
        let tt = this.taskTypes[typeName];
        if (tt === undefined) {
            if (typeName == 'qualify') {
                return <FA name='address-book' size="lg" fixWidth={true} />;
            } else if (typeName == 'legend') {
                return <FA name='newspaper-o' size="lg" fixWidth={true} />;
            } else {
                return <FA name='shopping-bag' size="lg" fixWidth={true} />;
            }
        }
        return tt.icon;
    }
    //获取任务类型
    getCTaskType(typeName: string): CType {
        return this.taskTypes[typeName];
    }
    //获取任务类型
    getCommonType(bizName: string): CCommonType {
        let model = this.getCTaskType(bizName);
        return model as CCommonType;
    }
    //搜索结束------------------------------------------------


    //显示开始------------------------------------------------
    //显示销售任务明细页面
    showTaskDetailEdit = async (task: Task) => {
        let name = task.biz.obj ? task.biz.obj.name : task.biz.name;
        let tt = this.getCTaskType(task.biz.obj.name);
        if (tt !== undefined) tt.showDetailEdit(task);
    }
    //显示销售任务明细页面
    showDetailFromId = async (task: Task) => {
        this.getCTaskType(task.biz.obj.name).showDetailFromId(task.id);
    }
    //显示任务完结页面
    showTaskComplet = async (task: Task) => {
        let name = task.biz.obj ? task.biz.obj.name : task.biz.name;
        this.getCTaskType(name).showComplet(task);
    }
    //显示结束------------------------------------------------


    //处理任务开始------------------------------------------------
    //完结任务
    async finishTask(task: Task) {
        //完结任务--后台数据
        let { id, fields, type } = task;
        let param = {
            taskid: id,
            resulttype: "compl",
            result: "完结",
            fields: fields
        };

        if (type.obj.name == "qualify") {
            await this.uqs.salesTask.CompletionCustomerInfoTask.submit(param);
        } else {
            await this.uqs.salesTask.CompletionTask.submit(param);
        }
        this.tasks.remove(task);
        await this.cApp.cCustomer.getActiveTasks(task.customer);
        this.closePage(2);
    }


    //添加并完结任务
    createAndFinishTask = async (task: Task) => {
        let newtask = await this.createTasks(task);
        await this.showTaskComplet(newtask);
    }

    //显示任务延期页面
    showTaskExtension = async (model: Task) => {
        this.openVPage(VSalesTaskExtension, model);
    }
    //延期任务
    async extensionTask(task: Task, result: string, resulttype: string, date: Date) {

        let t: any = await this.uqs.salesTask.Task.load(task.id);
        t.deadline = date;
        await this.uqs.salesTask.Task.save(task.id, t);

        task.deadline = date;
        this.tasks.postPone(date, task);
        /**
       let param = { taskid: task.id, result: result, remindDate: date };
       await this.uqs.salesTask.ExtensionTask.submit(param);
       this.tasks.postPone(date, task);
       **/
    }

    //显示拒绝任务页面
    showTaskInvalid = async (model: Task) => {
        this.openVPage(VSalesTaskInvalid, model);
    }
    //拒绝任务
    onInvalidTask = async (task: Task, result: string, resulttype: string) => {
        let param = { taskid: task.id, resulttype: "Inval", result: result };
        await this.uqs.salesTask.CompletionTask.submit(param);
        /*
        let index = this.tasks.findIndex(v => v.id === model.id);
        if (index >= 0) this.tasks.splice(index, 1);
        */
        this.tasks.remove(task);
    }

    //显示选择产品页面
    showPorductSelect = async (task: Task) => {
        let { cProduct } = this.cApp;
        this.createproduct = {
            task: task,
            product: undefined,
            pack: undefined,
            note: undefined
        }
        cProduct.showProductSelect(this.createproduct);
    }

    showPorductSelectDetail = async (createproduct: any) => {
        this.createproduct = createproduct;
        this.openVPage(VCreateProduct, this.createproduct);
    }

    //添加产品
    createTaskProduct = async (createproduct: CreateProduct) => {
        this.createproduct = createproduct;
        let { product, task, note } = this.createproduct;
        note = note ? note : undefined;
        let param = { taskid: task.id, productid: product.id, note: note };
        this.uqs.salesTask.CreateTaskProduct.submit(param);
    }

    //显示产品列表
    showTaskProductDetail = async (task: Task) => {
        let products = await this.uqs.salesTask.SearchTaskProduct.table({ taskid: task.id });
        /*products.map((v, index) => {
            await v.product.assure();
            let aa = v.product;
            let aaa = 1;
        })*/
        await this.openVPage(VProductDetail, products);
    }

    //添加包装-显示
    showPorductPackSelect = async (task: Task) => {
        let { cProduct } = this.cApp;
        let createproduct = {
            task: task,
            product: undefined as any,
            pack: undefined as any,
            note: undefined as any
        }
        cProduct.showProductPackSelect(createproduct);
    }
    showPorductPackSelectDetail = async (createproduct: any) => {
        this.createproduct = createproduct;
        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let product = await loader.load(createproduct.product.id);

        this.openVPage(VCreateProductPack, product)
    }

    //添加包装
    createTaskProjectPack = async (createproduct: any) => {
        this.createproduct = createproduct;
        let { task, product, note, pack } = this.createproduct;
        let productid = product.id;
        let taskid = task.id;

        let promises: PromiseLike<any>[] = [];
        pack.forEach(v => {
            promises.push(this.uqs.salesTask.CreateTaskProductPack.submit({ task: taskid, product: productid, pack: v, note: note }));
        })
        let results = await Promise.all(promises);
        this.closePage(2);
    }

    //显示包装列表
    showTaskProjectPackDetail = async (task: Task) => {
        let projects = await this.uqs.salesTask.SearchTaskProductPack.table({ taskid: task.id });
        this.openVPage(VProductPackDetail, projects);
    }


    //添加项目-显示
    showCreateProject = async (task: Task) => {
        this.openVPage(VCreateProject, task);
    }

    //添加项目
    createTaskProject = async (task: Task, note: string) => {
        let param = { taskid: task.id, note: note };
        await this.uqs.salesTask.CreateTaskProject.submit(param);
    }

    //显示项目列表
    showTaskProjectDetail = async (task: Task) => {
        let projects = await this.uqs.salesTask.SearchTaskProject.table({ taskid: task.id });
        this.openVPage(VProjectDetail, projects);
    }

    //处理任务结束------------------------------------------------


    //添加任务开始------------------------------------------------
    //显示任务类页面
    showSelectTaskType = async (customer: any) => {
        //return await this.cSalesTaskType.call();
        //await this.cSelectType.start();
        let type = {
            id: 1,
            name: 'qualify',
            description: '任务'
        };
        let biz = {
            id: 1,
            name: 'nonreagent',
            description: ''
        };

        let task = {
            id: null as any,
            type: type,
            biz: biz,
            description: null as any,
            remindDate: null as any,
            deadline: null as any,
            customer: customer
        }
        //this.cApp.cCustomer.showSelectCustomer(task);
        this.openVPage(VCreateTask, task);

    }

    showCreateTaskOfCustomer = async (customer: any) => {
        //return await this.cSalesTaskType.call();
        //await this.cSelectType.start();
        let type = {
            id: 1,
            name: 'qualify',
            description: '任务'
        };
        let biz = {
            id: 1,
            name: 'nonreagent',
            description: ''
        };

        let task = {
            id: null as any,
            type: type,
            biz: biz,
            description: null as any,
            remindDate: null as any,
            deadline: null as any,
            customer: customer
        }
        //this.cApp.cCustomer.showSelectCustomer(task);
        this.openVPage(VCreateTaskOfCustomer, task);

    }


    //显示选择处理方式的页面
    showCrateCheck = async (task: Task) => {
        this.openVPage(VCreateCheck, task);
    }

    //添加任务
    createTask = async (param: any, task: Task) => {
        await this.createTasks(task);
        await this.searchTaskByKey(0);
        await this.cApp.cCustomer.getActiveTasks(task.customer)
    }

    private createTasks = async (task: Task) => {
        let { customer, type, biz, description, priorty, deadline } = task;
        let customerId = customer.id;
        let typeId = type.id;
        let bizIds = biz.id;
        priorty = priorty ? 1 : 0;
        deadline = deadline ? deadline : undefined;
        description = description ? description : undefined;
        //添加任务--后台数据
        let model = { id: undefined as any, description: description, customer: customerId, type: typeId, biz: bizIds, sourceID: "", sourceType: "", sourceNo: "", priorty: priorty, deadline: deadline };
        let ret = await this.uqs.salesTask.AddTask.submit(model);
        task.id = ret.id;
        return task;
        /**
        //添加任务--前台页面
        this.tasks.unshift({
            id: ret.id,
            description: description,
            customer: this.tuidCustomer.boxId(customerId),
            type: this.taskTypeTuid.boxId(typeId),
            sourceID: "",
            sourceType: "",
            sourceNo: "",
            priorty: priorty,
            deadline: deadline
        });
        **/
    }
    //添加任务结束------------------------------------------------

    //显示客户明细页面
    showCustomerDetail = async (customerId: any) => {
        let { cCustomer } = this.cApp;
        cCustomer.showCustomerDetail(customerId);
    }

    showPost = () => {
        this.cApp.cPost.showPostList();
    }

    render = observer(() => {
        if (this.isLogined) {
            return this.renderView(VMain);
        } else {
            return <div className="d-flex h-100 flex-column align-items-center justify-content-center" >
                <div className="flex-fill" />
                <button className="btn btn-success w-20c" onClick={() => nav.showLogin(this.loginCallback, true)}>
                    <FA name="sign-out" size="lg" /> 请登录
                </button>
                <div className="flex-fill" />
                <div className="flex-fill" />
            </div >;
        }
    })

    private loginCallback = async () => {
        nav.pop();
        await this.internalStart(undefined);
    }

    tab = () => {
        return <this.render />;
    }
}
