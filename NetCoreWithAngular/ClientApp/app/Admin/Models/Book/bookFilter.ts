import { SelectListItem } from '../../../../Core/SelectListItem';

enum Genre {
    Fantasy = 1,
    Horror = 2,
    Drama = 3,
    SciFi = 4
}

export class BookFilter {
    title: string;
    author: string;
    pageCount?: number;
    genre?: Genre;
    genreList: SelectListItem[];
}