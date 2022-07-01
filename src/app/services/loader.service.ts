import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getLoader(): Observable<boolean> {
    return this.loader.asObservable();
  }

  public setLoader(state: boolean): void {
    this.loader.next(state);
  }
}
