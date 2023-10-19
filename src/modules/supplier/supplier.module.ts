import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Suppliers from "./supplier.entity";
import { SupplierController } from "./supplier.controller";
import { SupplierService } from "./supplier.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([Suppliers]),
    ],
    controllers: [SupplierController],
    providers: [SupplierService],
  })
  export class SupplierModule { }