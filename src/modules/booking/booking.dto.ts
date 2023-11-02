import { ApiProperty } from "@nestjs/swagger";

export class AnggotaDTO {
    @ApiProperty()
    nama: string;

    @ApiProperty()
    no_telepone: string;

    @ApiProperty()
    alamat: string;

    @ApiProperty()
    jenis_kelamin: string;

    @ApiProperty()
    kebangsaan: string;
}

export class BookingDTO {
    @ApiProperty()
    kode_booking: string;

    @ApiProperty()
    jalur: string;

    @ApiProperty()
    tanggal_naik: string;

    @ApiProperty()
    tanggal_turun: string;

    @ApiProperty()
    nama_ketua: string;

    @ApiProperty()
    alamat_ketua: string;

    @ApiProperty()
    no_identitas_ketua: string;

    @ApiProperty()
    no_telepone_ketua: string;

    @ApiProperty()
    tempat_lahir_ketua: string;

    @ApiProperty()
    tanggal_lahir_ketua: string;

    @ApiProperty()
    jenis_kelamin_ketua: string;

    @ApiProperty()
    kebangsaan_ketua: string;

    @ApiProperty()
    no_kontak_darurat_ketua: string;

    @ApiProperty({ type: [AnggotaDTO] })
    anggota: JSON;

    @ApiProperty()
    tarif: number;

    @ApiProperty()
    rombongan: number;
}

