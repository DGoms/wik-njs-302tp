export type ObjectType<T> = { new(...args: any[]): T };

export type Diff<T, U> = T extends U ? never : T
export type Filter<T, U> = T extends U ? T : never
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function|Object ? never : K }[keyof T]
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

export type SchemaOf<T> = Pick<T, NonFunctionPropertyNames<T>>