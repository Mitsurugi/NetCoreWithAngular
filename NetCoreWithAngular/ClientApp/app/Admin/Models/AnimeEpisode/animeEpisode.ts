import { IDependentEntity } from '../../../Core/Models/IDependentEntity'

export class AnimeEpisode implements IDependentEntity<number, number> {
    id?: number;
    parentId: number;
    title: string;    
}