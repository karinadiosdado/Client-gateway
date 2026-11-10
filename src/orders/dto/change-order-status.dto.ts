import { IsEnum, IsUUID } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum.js";
export class ChangeOrderStatusDto {
@IsUUID()
id!: string;

@IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList.join(", ")}`
})
status!: OrderStatus;

}
