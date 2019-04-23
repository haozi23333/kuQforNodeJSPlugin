import { CQ_EVENT, CQ_MESSAGE_EVENT } from "./messages/events";

export class Cmd {
    constructor() {

    }

    public action(type: CQ_EVENT | CQ_EVENT[]): Cmd {
        return this;
    }

    public router(): Cmd {
        return this;
    }
}