import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum.js';
// importa el objeto real de js para usarlo como valor por defecto
//importa como arreglo que usa class-validator para comparar valores 
//import { OrderStatus } from 'src/generate/prisma/enums';

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @IsNumber()
    @IsPositive()
    totalItem: number;

   @IsEnum(OrderStatusList, {
    message: `Possible status values are ${(OrderStatusList).join(", ")}`,
})
@IsOptional()
status: OrderStatus = OrderStatus.PENDING;
}