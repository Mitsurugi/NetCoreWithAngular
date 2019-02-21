import { SelectListItem } from '../Models/SelectListItem';

export interface IUser<TKey> {
    id?: TKey;
    userName: string;
    password: string;
    role: string;
    roleDisplayName: string;
    roleList: SelectListItem[]
}