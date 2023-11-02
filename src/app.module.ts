import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bookings from './modules/booking/booking.entity';
import { BookingModule } from './modules/booking/booking.module';
import Kuotas from './modules/kuota/kuota.entity';
import { KuotaModule } from './modules/kuota/kuota.module';

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
        Bookings,
        Kuotas
      ],
    }),
    BookingModule,
    KuotaModule
  ]
})
export class AppModule { }
