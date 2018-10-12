import * as urljoin from "urljoin";
import api from '../api';

export abstract class BaseModel<T> {
protected static basePath: string = '';

    constructor(private basePath) {
        
    }

    protected static getFullUrl(endUrl: string|number): string {
        if(typeof endUrl === "number") {
            endUrl = String(endUrl);
        }

        return urljoin()
    }

    static async find(filter: T) {
        
    }

    static async findById(id: number){
        const { data } = await api.get(this.getFullUrl(id));
        const model = new this(data);
        if (includes && includes.length) await album.loadIncludes(includes)
        return album
    }

    create() {

    }

}