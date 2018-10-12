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
  basePath = 'albums';

  userId: number
  id: number
  title: string

  user: UserSchema | void = null
  photos: PhotoSchema[] = []

  constructor(albumData: AlbumSchema) {
    super(['user', 'photos']);
    Object.assign(this, albumData)
  }

  static async findById(albumId: number, includes?: string[]): Promise<Album> {
    const { data } = await api.get<AlbumSchema>(`albums/${albumId}`)
    const album = new Album(data)
    if (includes && includes.length) await album.loadIncludes(includes)
    return album
  }

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

  toString() {
    return JSON.stringify(this)
  }
}

export default Album