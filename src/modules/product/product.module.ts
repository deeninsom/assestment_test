import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import Products from "./product.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }