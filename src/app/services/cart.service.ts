import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Contributor } from '../core/models/github-api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public addToCart(contributor: Contributor): void { }

  public has(contributor: Contributor): boolean {
    return true;
  }

  public getCart(): Observable<Contributor[]> {
    return EMPTY;
  }
}
