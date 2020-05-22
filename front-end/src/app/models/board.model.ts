import { Column } from './column.model';

export class Board{

    _id: string;
    title: string;

    constructor(public name: string, public columns: Column[]) {
        this.title = name;
    }
}
