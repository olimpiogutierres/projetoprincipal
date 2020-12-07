import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {




  constructor(private http: HttpClient) {
    super();



  }
  baseUrl: string = 'https://localhost:44315/api/usuarios/';

  // login(loginPayload) : Observable<any> {
  //   return this.http.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload);
  // }

  listarUsuarios(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  obterUsuarioPeloId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  criarUsuario(user: User): Observable<User> {


    

    var stringified = JSON.stringify(user, function (key, val) {
      if (key === 'id' || key === 'lightStatus') {
        return void (0);
      }
      if (key === 'inputPort' || key === 'outputPort') {
        return val.id;
      }
      return val;
    });

    console.log(stringified);
    this.optionsHttp.body = { stringified };
    

    return this.http.post<any>(this.baseUrl, stringified.replace('"escolaridade":"','"escolaridade":').replace('"}','}'), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });

  }

  atualizarUsuario(user: User): Observable<any> {
    return this.http.put<any>(this.baseUrl + user.Id, user);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl  + id);
  }
}
