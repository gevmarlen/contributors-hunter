import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Contributor } from '../core/models/github-api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ReplaySubject<Contributor[]> = new ReplaySubject<Contributor[]>();
  private _cart: Contributor[] = [];

  /**
   * Add contributor to cart
   * @param contributor
   */
  public addToCart(contributor: Contributor): void {
    this._cart.push(contributor);
    this.cart.next(this._cart);
  }

  /**
   * Checks if contributor is in cart.
   * @param contributor
   */
  public has(contributor: Contributor): boolean {
    return !!this._cart.find(element => element.id === contributor.id);
  }

  public getCart(): Observable<Contributor[]> {
    return this.cart.asObservable();
  }
}
