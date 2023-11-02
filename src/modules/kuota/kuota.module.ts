import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KuotaController } from "./kuota.controller";
import { KuotaService } from "./kuota.service";
import Kuotas from "./kuota.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Kuotas]),
  ],
  controllers: [KuotaController],
  providers: [KuotaService],
})
export class KuotaModule { }