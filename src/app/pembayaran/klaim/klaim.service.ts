import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions}		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Klaim }			from './klaim';
import { ENV }				from '../../environment';

@Injectable()
export class KlaimService {
	private klaimUrl = ENV.klaimUrl;

	constructor(
		private http:Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllKlaim(): Observable<any[]> {
		return this.authHttp.get(this.klaimUrl)
			.map((res: Response) => res.json());
	}

	getKlaim(id: number): Observable<any> {
		const url = `${this.klaimUrl}/${id}`;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}

	updateKlaim(klaim: any, id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(klaim);

		const url = `${this.klaimUrl}/${id}`
		return this.authHttp.put(url, body, options)
			.map((res: Response) => res.json());
	}
}