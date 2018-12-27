import { IEntity } from '../../../../Core/Models/IEntity'

export class Anime implements IEntity<number>{
    id?: number;
    title: string;
    seasonCount: number;
    imageId?: number;
    imageFile?: File;
}