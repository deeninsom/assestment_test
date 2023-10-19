import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Products from "../product/product.entity";
import Purchases from "./purchase.entity";
import { PurchaseController } from "./purchase.controller";
import { PurchaseService } from "./purchase.service";
import PurchaseItems from "./purchase_item/purchase_item.entity";
import Suppliers from "../supplier/supplier.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Purchases, PurchaseItems, Suppliers]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }