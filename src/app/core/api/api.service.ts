import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contributor, Organization, Repository } from '../models/github-api';
import { OctokitService } from './octokit.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private readonly octokitService: OctokitService,
  ) { }

  /**
   * Get organization data by name
   * @param name - organization name
   */
  public getOrganization(name: string): Observable<Organization[]> {
    return this.octokitService.request(`GET /orgs/${name}`, {});
  }

  /**
   * Get organization repositories
   * @param organizationName - organization name
   */
  public getOrganizationRepositories(organizationName: string): Observable<Repository[]> {
    return this.octokitService.request(`GET /orgs/${organizationName}/repos`, {});
  }

  /**
   * Get contributors list by repo
   * @param repoName - repository name
   */
  public getContributors(repoName: string): Observable<Contributor[]> {
    return this.octokitService.request(`GET /repos/${repoName}/contributors`, {});
  }
}
