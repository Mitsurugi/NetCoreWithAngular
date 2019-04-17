import { IEntity } from '../../../../Core/Models/IEntity'
import { Genre } from '../Book/book'
 
export class BookGrid implements IEntity<number> {
    id?: number;
    title: string;
    author: string;
    pageCount: number;
    genre?: Genre;
    genreName: string;
}