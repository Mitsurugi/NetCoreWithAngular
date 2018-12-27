import { IEntity } from '../../../../Core/Models/IEntity'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class Anime implements IEntity<number>{
    id?: number;
    title: string;
    seasonCount: number;
    imageId?: number;
    imageUrl: SafeResourceUrl;
}