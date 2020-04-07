import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class DataApiService {

	token;
	URL: string;
	public id;

	constructor(public _http: HttpClient) {
		this.URL = "/api/v1/";
	}

	//login de usuarios
	login(body: any): Observable<any> {
     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'POST');
    // headers.append('Access-Control-Allow-Origin', '*');

		return this._http.post(this.URL + 'Login/', body, { headers: headers });
	}

	//crear usuario nuevo
	create(user: User): Observable<any> {
		this.token = localStorage.getItem('token');
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		console.log(params);
		return this._http.post(this.URL + 'registerProfile/', params, { headers: headers });
	}

	//traer todos los usuarios
	getUsers(): Observable<any> {
		this.token = localStorage.getItem('token');
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		console.log(this.token);

		return this._http.get(this.URL + 'registerProfile/', { headers: headers });
	}

	/*traer por id TODO
	getUser(id): Observable<any> {
		//let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		return this._http.get(this.URL + 'registerProfile/' + this.id);
	}
	*/

	//actualizar usuario
	updateUser(id, user: User): Observable<any> {
		this.token = localStorage.getItem('token');
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		return this._http.put(this.URL + 'editProfile/' + id, params, { headers: headers });
	}

	//eliminar usuario
	deleteUser(id, user: User): Observable<any> {
		let params = JSON.stringify(user);
		this.token = localStorage.getItem('token');
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		return this._http.put(this.URL + 'deleteProfile/' + id, params, { headers: headers });
	}


	getToken() {
		let token = localStorage.getItem('token');
		if (token != "undefined")
			this.token = token;
		else
			this.token = null
		return this.token;
  }
  
}
