import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller.js';
import { ClientsModule as MicroserviceClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  imports: [
    MicroserviceClientsModule.register([
      {
        name: CLIENTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.clientsMicroserviceHost,
          port: envs.clientsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [],
})
export class ClientsModule {}
