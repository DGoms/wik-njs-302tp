import { UserSchema } from "./user";
import { PhotoSchema } from "./photo";
import api from '../api';
import { BaseModel } from "../core/BaseModel";

export interface AlbumSchema {
    userId: number
    id: number
    title: string
}

export class Album extends BaseModel<AlbumSchema> implements AlbumSchema {
    protected static basePath: string = 'albums';
    protected static availableIncludes: string[] = ['user', 'photos'];

    userId: number
    id: number
    title: string

    user: UserSchema | void = null
    photos: PhotoSchema[] = []

    constructor(albumData: AlbumSchema) {
        super(albumData);
    }

    // async loadIncludes(includes: string[]): Promise<void> {
    //     await Promise.all(includes.map(async (include) => {
    //         switch (include) {
    //             case 'user':
    //                 const { data: userData } = await api.get<UserSchema>(`users/${this.userId}`)
    //                 this.user = userData
    //                 break
    //             case 'photos':
    //                 const { data: photoData } = await api.get<PhotoSchema[]>(`photos?albumId=${this.id}`)
    //                 this.photos = photoData
    //                 break
    //         }
    //     }))
    // }

    toString() {
        return JSON.stringify(this)
    }
}

export default Album