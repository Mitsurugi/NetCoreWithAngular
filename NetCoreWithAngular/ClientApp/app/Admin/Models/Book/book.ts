import { IEntity } from '../../../../Core/Models/IEntity'
import { SelectListItem } from '../../../../Core/Models/SelectListItem';

enum Genre {
    Fantasy = 1,
    Horror = 2,
    Drama = 3,
    SciFi = 4
}

export class Book implements IEntity<number> {
    id?: number;
    title: string;
    author: string;
    pageCount: number;
    genre?: Genre;
    genreList: SelectListItem[];
}