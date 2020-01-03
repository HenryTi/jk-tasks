import { observable } from 'mobx';
import _ from 'lodash';
import { Task } from './task';

interface DateTasks {
    date: Date;
    list: Task[];
}

export class Tasks {
    @observable tasksNow: Task[];
    @observable dateTasksList: DateTasks[];

    constructor(taskArr: Task[]) {
        this.tasksNow = observable.array([], { deep: true });
        this.dateTasksList = observable.array([], { deep: true });

        for (let task of taskArr) {
            this.add(task);
        }
    }

    postPone(date: Date, task: Task) {
        this.remove(task);
        let t = _.clone(task);
        t.deadline = date;
        this.add(t);
    }

    add(task: Task) {
        let { deadline } = task;
        if (!deadline) {
            this.tasksNow.push(task);
            return;
        }
        let dl = new Date(deadline).getTime();
        let dateTasks = this.dateTasksList.find(v => v.date.getTime() === dl);
        if (dateTasks === undefined) {
            dateTasks = { date: deadline, list: [task] };
            // 插入到合适的地方
            this.dateTasksList.push(dateTasks);
        }
        else {
            dateTasks.list.push(task);
        }
    }

    remove(task: Task) {
        let index = this.tasksNow.findIndex(v => v.id === task.id);
        if (index >= 0) {
            this.tasksNow.splice(index, 1);
            return;
        }
        let len = this.dateTasksList.length;
        for (let i = 0; i < len; i++) {
            let dt = this.dateTasksList[i];
            let { list } = dt;
            index = list.findIndex(v => v.id === task.id);
            if (index >= 0) {
                list.splice(index, 1);
                if (list.length === 0) {
                    this.dateTasksList.splice(i, 1);
                }
                return;
            }
        }
    }
}
