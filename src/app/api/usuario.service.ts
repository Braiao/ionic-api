import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlBase = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  //   public obterTodos() {
  //   return this.http.get(`${this.urlBase}/users`);
  // }
  public obterTodos(pagina: number = 1, limite: number = 10): Observable<any> {
    const url = `${this.urlBase}/users?page=${pagina}&per_page=${limite}`;
    return this.http.get<any>(url);

  }
}
