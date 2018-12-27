import { IEntity } from "./IEntity";

export interface IDependentEntity<TKey, TParentKey> extends IEntity<TKey> {
    parentId: TParentKey;
}