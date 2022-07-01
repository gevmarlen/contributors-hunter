import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isEmpty } from 'lodash';
import { catchError, concatMap, EMPTY, finalize, Observable, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { Repository } from '../../core/models/github-api';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  public repositories!: Repository[] | null;
  public repositoryColumns: Extract<keyof Repository, string>[] = ['name', 'contributors_url'];
  public form: FormGroup = new FormGroup({
    organizationName: new FormControl(),
  });
  public errorMessage!: string;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly api: ApiService,
    private readonly dashboardService: DashboardService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.dashboardService.getRepositories()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(repositories => {
        this.repositories = repositories;
      })
  }

  public onSubmit(): void {
    const organizationName = this.form.get('organizationName')?.value;
    this.api.getOrganization(organizationName)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => {
          this.errorMessage = 'Organization not found';
          this.dashboardService.setRepositories(null)
          this.changeDetectorRef.markForCheck()
          return EMPTY;
        }),
        concatMap(() => this.api.getOrganizationRepositories(organizationName)),
      )
      .subscribe(repositories => {
        if (isEmpty(repositories)) {
          this.errorMessage = 'Repositories not found';
        } else {
          this.errorMessage = '';
          this.dashboardService.setRepositories(repositories);
        }
        this.changeDetectorRef.markForCheck()
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
