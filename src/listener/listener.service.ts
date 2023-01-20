import { HttpException, Injectable } from '@nestjs/common';
import { ListenerStatus } from 'src/common/enums';
import { v4 as uuidv4 } from 'uuid';
import { CreateListenerDto } from './dtos/create-listener.dto';
import { listenerData } from './dtos/data.dto';

@Injectable()
export class ListenerService {
    async getListener(id: string, owner: string) {
        const listener = listenerData.find((x) => x.guild === id && x.owner === owner);
        if (!listener) throw new HttpException('Data Not Exist', 404);
        return listener;
    }

    async getWaitingListeners(id: string) {
        const listener = listenerData.filter((x) => x.guild === id && x.status === ListenerStatus.WaitingForCallback);
        if (!listener) throw new HttpException('Data Not Exist', 404);
        return listener;
    }

    async updateListener(id: string, user: string, data: any) {
        const find = listenerData.find((x) => x.guild === id && x.owner === user && x.status === ListenerStatus.WaitingForCallback);
        if (!find) throw new HttpException('Data Not Exist', 404);
        find.status = ListenerStatus.Callback;
        find.callback = data;
        const index = listenerData.findIndex((x) => x.id === find.id);
        listenerData[index] = find;
        return find
    }

    async getUserRequest(id: string) {
        const find = listenerData.find((x) => x.id === id && x.status === ListenerStatus.Callback);
        if (!find || !find.callback) throw new HttpException('Data Not Exist', 404);
        return find;
    }

    async insertListenerForDiscord(data: any) {
        const id = uuidv4();
        console.log('data', data)
        const insert = {
            id,
            status: ListenerStatus.WaitingForCallback,
            owner: data.owner,
            type: data.type,
            guild: data.guild,
            data: JSON.parse(data.data),
        } as CreateListenerDto
        listenerData.push(insert);
        return {
            id,
        };
    }
}
