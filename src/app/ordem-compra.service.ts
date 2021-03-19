import { Injectable } from '@angular/core';



import { Pedido } from './shared/pedido.model';
import { URL_API } from './app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // <---- Adiciona isto ao serviço
})
export class OrdemCompraService {
  constructor(private http: HttpClient) { }

  public efetivarCompra(pedido: Pedido): Observable<any> {



    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      // tslint:disable-next-line: object-literal-shorthand
      headers: headers
    };
    return this.http.post(
      `${URL_API}/pedidos`,
      JSON.stringify(pedido),
      options).pipe(map((resposta: Response) => resposta.json()));
  }
}
