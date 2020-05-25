import { Task } from 'src/app/models/task.model';
export class Column{

    _id: string;
    title: string;
    _boardId: string;
    tasks: Task[];

    constructor(public name: string, public _tasks: string[]) {
    }
}