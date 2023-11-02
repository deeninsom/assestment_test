import { ApiProperty } from "@nestjs/swagger";

export class KuotaDTO {
    @ApiProperty()
    tanggal: string;

    @ApiProperty()
    kuota: number;
}

