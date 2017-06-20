import { Component }				from '@angular/core';
import * as _ from "lodash";

import { Pembayaran }				from './pembayaran';
import { PembayaranService }		from './pembayaran.service';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';

@Component({
 	selector: 'pembayaran-page',
 	templateUrl: './pembayaran.component.html',
 	providers: [PembayaranService, AsuransiService]
})

export class PembayaranComponent {
	allPembayaran: Pembayaran[];
	allAsuransi = ['', 'tunai'];

	constructor(
		private pembayaranService: PembayaranService,
		private asuransiService: AsuransiService
	) {}

	private initAsuransiList(items: Asuransi[]): void {
		for (let item of _.uniqBy(items, 'nama_asuransi')) {
			this.allAsuransi.push(item.nama_asuransi);
		}
	}

	ngOnInit(): void {
		this.asuransiService.getAllAsuransi()
			.then(allAsuransi => this.initAsuransiList(allAsuransi));

		this.pembayaranService.getAllPembayaran()
			.then(allPembayaran => this.allPembayaran = allPembayaran);
	}
}