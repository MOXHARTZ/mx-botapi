import { Module } from '@nestjs/common';
import { ListenerController } from './listener.controller';
import { ListenerService } from './listener.service';

@Module({
    controllers: [ListenerController],
    providers: [ListenerService],
    exports: [ListenerService],
})
export class ListenerModule { }
