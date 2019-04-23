import { Application } from "./application";
import { CQ_CALLBACK_EVENT, CQ_MESSAGE_EVENT } from "./messages/events";
import { decode } from "./util";

export interface IContext {
   raw_data: string
   data: string[]
   prefix: string

   params: string[]
   type: CQ_MESSAGE_EVENT | CQ_CALLBACK_EVENT

   regNextAction: () => void
}

export class Context implements IContext {
   public readonly raw_data: string = ''
   public readonly data: string[] = []
   public params: string[]

   public app: Application;

   constructor(app: Application, raw_data = '') {
      this.app = app;
      this.raw_data = this.autoDecode(raw_data.toString());
      this.data = this.raw_data.split(' ');
      console.log(`[DEBUG]: 收到消息 ${this.raw_data}`)
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

   private autoDecode(raw_string: string) {
      return raw_string.split(' ').map(str => /[=\/]$/.test(str) ? decode(str) : str).join(' ');
   }

   public regNextAction() {

   }
}