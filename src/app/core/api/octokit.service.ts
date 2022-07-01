import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types/dist-types/generated/Endpoints';
import { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse';
import { RequestParameters } from '@octokit/types/dist-types/RequestParameters';
import { Route } from '@octokit/types/dist-types/Route';
import { finalize, from, map, Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class OctokitService {
  private octokit: Octokit = new Octokit();

  constructor(
    private readonly loaderService: LoaderService,
  ) {
  }

  /**
   * Request wrapper for Octokit
   * @param route - method
   * @param options - additional options
   */
  public request<R extends Route, T extends any>(
    route: keyof Endpoints | R,
    options?: R extends keyof Endpoints ? Endpoints[R]["parameters"] & RequestParameters : RequestParameters
  ): Observable<T> {
    this.loaderService.setLoader(true);

    return from(this.octokit.request(route, options))
      .pipe(
        map((response: OctokitResponse<T>) => response.data),
        finalize(() => this.loaderService.setLoader(false)),
      );
  }
}
