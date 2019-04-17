import { Application } from "./application";

export interface IContext {
    raw_data: string[]
    prefix: string
}

export class Context implements IContext{
   public readonly raw_data: string[] = []
   
   constructor(app: Application, raw_data = '') {
       this.raw_data = raw_data.split(' ');
   }

   /**
    * 获取前缀
    * @readonly
    * @memberof Context
    * @returns string
    */
   public get prefix(): string {
      return this.raw_data[0];
   }
}