import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { ClientsModule } from './clients/clients.module.js';

@Module({
  imports: [ProductsModule, OrdersModule, CategoriesModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
