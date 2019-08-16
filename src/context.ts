import { Application } from "./application";
import { CQ_CALLBACK_EVENT, CQ_MESSAGE_EVENT } from "./messages/events";
import { decode } from "./util";
import { CQ_MESSAGE, PrivateMessage, GroupMessage } from "./messages/message";

export interface IContext {
   raw_data: string
   data: string[]
   prefix: string
   params: any
   type: CQ_MESSAGE_EVENT | CQ_CALLBACK_EVENT
   
   message: CQ_MESSAGE;
   // regNextAction: () => void
   // parserMessage

   send: (...args: string[]) => Promise<null>
}

export class Context implements IContext {
   public readonly raw_data: string = ''
   public readonly data: string[] = []
   public params: string[]
   public app: Application;

   public message: CQ_MESSAGE;
   constructor(app: Application, raw_data = '') {
      this.app = app;
      this.raw_data = this.autoDecode(raw_data.toString());
      // this.raw_data = raw_data.toString();
      this.data = this.raw_data.split(' ');
      console.log(`[DEBUG]: 收到消息 ${this.raw_data}`)
      this.parserMessage()
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

   public async send(...args: any[]) {
      return this.app.send.apply(this.app, args);
   }

   private autoDecode(raw_string: string) {
      return raw_string.split(' ').map((str, index) => {
         if (index === 0) return str;
        return /[=\/]$/.test(str) || ( !/[=\/]$/.test(str) && str.length % 4 === 0) ? decode(str) : str
      }).join(' ');
   }

   private parserMessage() {
      switch (this.prefix) {
         case CQ_MESSAGE_EVENT.PrivateMessage:
            (this.message as PrivateMessage) = {
               form_qq: parseInt(this.data[2]),
               content: decode(this.data[3])
            }
            break;
         case CQ_MESSAGE_EVENT.PrivateMessage:
            (this.message as GroupMessage) = {
               form_qq: parseInt(this.data[3]),
               form_group: parseInt(this.data[2]),
               content: decode(this.data[4])
            }
            break;
      }
   }
}