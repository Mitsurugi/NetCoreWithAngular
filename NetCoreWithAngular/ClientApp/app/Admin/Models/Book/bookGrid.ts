import { IEntity } from '../../../../Core/Models/IEntity'

export class BookGrid implements IEntity<number> {
    id?: number;
    title: string;
    author: string;
    pageCount: number;
    genre: string;
}