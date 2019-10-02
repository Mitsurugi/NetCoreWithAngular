import { SelectListItem } from '../../../Core/Models/SelectListItem';
import { Genre } from '../Book/book'

export class BookFilter {
    title: string;
    author: string;
    pageCount?: number;
    genre?: Genre;
    genreList: SelectListItem[];
}
