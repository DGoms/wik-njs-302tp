import { UserSchema } from "./user";
import { PhotoSchema } from "./photo";
import api from '../api';
import { BaseModel } from "../core/BaseModel";

export interface AlbumSchema {
    userId: number
    id: number
    title: string
}

export class Album extends BaseModel implements AlbumSchema {
    protected static basePath: string = 'albums';

    userId: number
    id: number
    title: string

    user: UserSchema | void = null
    photos: PhotoSchema[] = []

    constructor(albumData: AlbumSchema) {
        super(albumData);
    }
    
    /**
     * 
     * @param includes 
     * @override
     */
    async loadIncludes(includes: string[]): Promise<void> {
        await Promise.all(includes.map(async (include) => {
            switch (include) {
                case 'user':
                    const { data: userData } = await api.get<UserSchema>(`users/${this.userId}`)
                    this.user = userData
                    break
                case 'photos':
                    const { data: photoData } = await api.get<PhotoSchema[]>(`photos?albumId=${this.id}`)
                    this.photos = photoData
                    break
            }
        }))
    }
}

export default Album