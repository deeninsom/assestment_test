import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Products from './modules/product/product.entity';
import { ProductModule } from './modules/product/product.module';
import Suppliers from './modules/supplier/supplier.entity';
import { SupplierModule } from './modules/supplier/supplier.module';
import Purchases from './modules/purchase/purchase.entity';
import { PurchaseModule } from './modules/purchase/purchase.module';
import PurchaseItems from './modules/purchase/purchase_item/purchase_item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'Production'
          ? '.env.production'
          : '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [
        Products,
        Suppliers,
        Purchases,
        PurchaseItems
      ],
    }),
    ProductModule,
    SupplierModule,
    PurchaseModule
  ]
})
export class AppModule {}
