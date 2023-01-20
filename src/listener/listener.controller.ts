import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ListenerService } from './listener.service';

@Controller('listener')
export class ListenerController {
    constructor(private readonly listenerService: ListenerService) { }

    @Get('getListenerData/:user/:id')
    getListeners(@Request() req, @Param('user') user: string, @Param('id') id: string) {
        return this.listenerService.getListener(id, user);
    }

    @Get('getWaitingListeners/:id')
    getWaitingListeners(@Request() req, @Param('id') id: string) {
        return this.listenerService.getWaitingListeners(id);
    }

    @Get('listeners/getForDiscord/:id')
    getWaitingListenersForDiscord(@Request() req, @Param('id') id: string) {
        return this.listenerService.getUserRequest(id);
    }

    @Put(':id/:user')
    async updateListener(@Request() req, @Body() body, @Param('id') id: string, @Param('user') user: string) {
        if (typeof body === 'string') body = JSON.parse(body);
        if (!body) throw new Error('Body is empty');
        return this.listenerService.updateListener(id, user, body);
    }

    @Post('listeners/insertForDiscord')
    async insertListenerForDiscord(@Request() req, @Body() body) {
        if (typeof body === 'string') body = JSON.parse(body);
        if (!body) throw new Error('Body is empty');
        return this.listenerService.insertListenerForDiscord(body);
    }


}
