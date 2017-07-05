import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { StokObat }		from './stok-obat';
import { ENV }			from '../../environment';

@Injectable()
export class StokObatService {
	private stokObatUrl = ENV.stokObatUrl;

	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllStokObat(): Observable<StokObat[]> {
		return this.http.get(this.stokObatUrl)
			.map((res: Response) => res.json());
	}

	getStokObat(id: number): Observable<StokObat> {
		return this.getAllStokObat()
			.map(allStokObat => allStokObat.find(stok_obat => stok_obat.id == id));
	}

	createStokObat(stokObat: StokObat) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(stokObat);
    	return this.http.post(this.stokObatUrl, body, options ).map((res: Response) => res.json());
	}
	
	searchStokObat(id_obat_masuk: number, lokasi: number): Observable<StokObat> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_obat_masuk', ''+id_obat_masuk);		
		params.set('lokasi', ''+lokasi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.stokObatUrl+'/search', requestOptions)
		    .map((res: Response) => res.json());			
	}
}