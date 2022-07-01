import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Repository } from '../core/models/github-api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public getRepositories(): Observable<Repository[]> {
    return EMPTY;
  }

  public setRepositories(repositories: Repository[]): void {}
}
