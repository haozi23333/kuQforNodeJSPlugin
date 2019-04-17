import { Application } from "./application";
import { CQ_CALLBACK_EVENT, CQ_MESSAGE_EVENT } from "./messages/events";

export interface IContext {
    raw_data: string
    data: string[]
    prefix: string

    params: string[]
    type: CQ_MESSAGE_EVENT | CQ_CALLBACK_EVENT
}

export class Context implements IContext{
   public readonly raw_data: string =''
   public readonly data: string[] = []
   public params: string[]

   constructor(app: Application, raw_data = '') {
        this.raw_data = raw_data;
        this.data = raw_data.split(' ');
   }

   /**
    * 获取前缀
    * @readonly
    * @memberof Context
    * @returns string
    */
   public get prefix(): string {
      return this.data[0] || 'UnKnowPrefix';
   }

   public get type() {
      return this.prefix as CQ_MESSAGE_EVENT | CQ_CALLBACK_EVENT;
   }
}