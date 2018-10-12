import { SchemaOf, ObjectType } from './Type';
import * as urljoin from "urljoin";
import api from '../api';

export class BaseModel {
    protected static basePath: string = '';

    constructor(data: any) {
        Object.assign(this, data);
    }
    
    private static getFullUrl(endUrl: string|number): string {
        if(typeof endUrl === "number") {
            endUrl = String(endUrl);
        }

        return urljoin(this.basePath, endUrl);
    }

    /*
     * ORM
     */

    static async find<U extends BaseModel>(this: ObjectType<U>, filter: Partial<SchemaOf<U>>): Promise<U[]> {
        // @ts-ignore
        const { data } = await api.get(this.getFullUrl(''), {params: filter});

        let models:U[] = [];
        for(let item of data) {
            models.push(new this(item));
        }

        return models;
    }

    static async findById<U extends BaseModel>(this: ObjectType<U>, id: number, includes?: string[]): Promise<BaseModel>{
        // @ts-ignore
        const { data } = await api.get<U>(this.getFullUrl(id));
        const model: U = new this(data);
        if (includes && includes.length) await model.loadIncludes(includes)

        return model;
    }

    static async create<U extends BaseModel>(this: ObjectType<U>, data: SchemaOf<U>): Promise<U> {
        // @ts-ignore
        const { data: model } = await api.post<U>(this.getFullUrl(''), data);
        return model;
    }

    static async updateById<U extends BaseModel>(this: ObjectType<U>, id: number, data: Partial<SchemaOf<U>>): Promise<U> {
        // @ts-ignore
        const { data: model } = await api.patch<U>(this.getFullUrl(id), data);
        return model;
    }

    static async deleteById(id: number): Promise<boolean> {
        const {status} = await api.delete(this.getFullUrl(id));
        return status === 200;
    }

    async save() {
        BaseModel.updateById(this['id'], this);
    }

    /*
     * Utils
     */ 
    protected async loadIncludes(includes: string[]): Promise<void>{}


    toString() {
        return JSON.stringify(this)
    }

    // toJson() {
    //     let json = {}
    //     for(let key of Object.keys(this)){
    //         if(typeof this[key] !== "object") {
    //             json[key] = this[key];
    //         }
    //     }

    //     return json;
    // }
}