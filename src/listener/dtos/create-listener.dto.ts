import { ListenerStatus, ListenerType } from './../../common/enums';
export class CreateListenerDto {
    id: string;
    status: ListenerStatus;
    owner: string;
    type: ListenerType;
    guild: string;
    callback: any;
    data: any;
}