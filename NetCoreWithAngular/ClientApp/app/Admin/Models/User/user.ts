import { SelectListItem } from '../../../../Core/Models/SelectListItem';
import { IUser } from '../../../../Core/Users/IUser';

export class User implements IUser<string> {
    roleDisplayName: string;
    password: string;
    userName: string;
    role: string;
    roleList: SelectListItem[];
    id?: string;
    phone: string;
    
}