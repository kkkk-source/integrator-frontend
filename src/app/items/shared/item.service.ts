import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '@app/items/shared/item.model';
import { Pagination } from '@app/shared/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url = 'http://localhost:3000/api/v1/items';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  add(item: Item): Observable<Item> {
    return this.http
      .post<Item>(this.url, item, this.httpOptions)
      .pipe(tap((item: Item) => console.log(`added item id=${item.id}`)));
  }

  get(page: number = 1, limit: number = 10): Observable<Pagination<Item>> {
    return this.http.get<Pagination<Item>>(`${this.url}?page=${page}&limit=${limit}`).pipe(
      tap((_) => console.log('fetched items')),
      catchError(this.handleError<Pagination<Item>>('get', {} as Pagination<Item>))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to a remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // let the app keep working by returning an empty result.
      return of(result as T);
    };
  }
}
