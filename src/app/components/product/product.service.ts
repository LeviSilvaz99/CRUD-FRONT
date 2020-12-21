import { catchError, map } from 'rxjs/operators';
import { Product } from './product.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //baseUrl = "http://localhost:3001/products"
  baseUrl = "http://localhost:8080/crud/api/produtos"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  //Com Observables, conseguimos lidar com transferência de dados assíncrona.
  //Observable poderá emitir dados várias vezes em momentos distintos de sua existência.
  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'] 
    })
  }

  //Manda uma requisição para criar no backend e error
  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
      );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  //Manda uma requisição para ler no backend
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
      );
  }

  //Método que pega pelo idv 
  readById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`    
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
      );
  }

  //Metodo que atualiza
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url,product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
      );
  }

  delete(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
      );
  }
}
