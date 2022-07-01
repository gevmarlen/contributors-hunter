import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Repository } from '../core/models/github-api';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private repositories: ReplaySubject<Repository[] | null> = new ReplaySubject<Repository[] | null>();

  public getRepositories(): Observable<Repository[] | null> {
    return this.repositories.asObservable();
  }

  public setRepositories(repositories: Repository[] | null): void {
    this.repositories.next(repositories);
  }
}
