import { SelectListItem } from '../Models/SelectListItem';

export interface IUser<TKey> {
    id?: TKey;
    userName: string;
    password: string;
    role: string;
    roleList: SelectListItem[]
}