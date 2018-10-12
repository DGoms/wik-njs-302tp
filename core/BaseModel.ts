import * as urljoin from "urljoin";
import api from '../api';

export class BaseModel<T> {
    protected static basePath: string = '';
    protected static availableIncludes: string[];

    constructor(data: T) {
        Object.assign(this, data);
    }

    protected static getType(): typeof BaseModel {
        return BaseModel;
    }

    protected static getFullUrl(endUrl: string|number): string {
        if(typeof endUrl === "number") {
            endUrl = String(endUrl);
        }

        return urljoin(this.basePath, endUrl);
    }

    static async find(filter) {
        
    }

    static async findById<U>(id: number, includes?: string[]): Promise<U>{
        const { data } = await api.get<U>(this.getFullUrl(id));
        const model = new this(data);
        // if (includes && includes.length) await album.loadIncludes(includes)

        // @ts-ignore
        return model;
    }

    create() {

    }

}