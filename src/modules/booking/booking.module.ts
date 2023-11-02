import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import Products from "./booking.entity";
import Kuotas from "../kuota/kuota.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Kuotas]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule { }