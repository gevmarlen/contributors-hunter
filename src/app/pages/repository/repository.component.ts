import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { Contributor } from '../../core/models/github-api';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public contributors: Contributor[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cardService: CartService,
  ) { }

  public ngOnInit(): void {
    const { org, repo } = this.activatedRoute.snapshot.params;

    this.apiService.getContributors(`${org}/${repo}`)
      .pipe(take(1))
      .subscribe(contributors => {
        this.contributors = contributors;
        this.changeDetectorRef.markForCheck();
      })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  public availableToAdd(contributor: Contributor): boolean {
    return !this.cardService.has(contributor);
  }

  public addToCart(contributor: Contributor): void {
    this.cardService.addToCart(contributor);
  }
}
