import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public getLoader(): Observable<boolean> {
    return EMPTY;
  }

  public setLoader(state: boolean): void {}
}
