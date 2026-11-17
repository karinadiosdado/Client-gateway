import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATEGORIES_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORIES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.categoriesMicroserviceHost,
          port: envs.categoriesMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
