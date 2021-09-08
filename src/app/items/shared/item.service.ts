import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Item } from '@app/items/shared/item.model';

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
    return this.http.post<Item>(this.url, item, this.httpOptions).pipe(
      tap((newItem: Item) => console.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('add'))
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
      console.error(error); // log to console instead

      // let the app keep working by returning an empty result.
      return of(result as T);
    };
  }
}
