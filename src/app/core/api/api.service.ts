import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Contributor, Organization, Repository } from '../models/github-api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor() { }

  public getOrganization(name: string): Observable<Organization[]> {
    return EMPTY
  }


  public getOrganizationRepositories(organizationName: string): Observable<Repository[]> {
    return EMPTY
  }

  public getContributors(repoName: string): Observable<Contributor[]> {
    return EMPTY
  }
}
