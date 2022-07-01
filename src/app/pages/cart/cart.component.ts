import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Contributor } from '../../core/models/github-api';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
  public cardElements: Contributor[] = [];
  public cardColumns: Extract<keyof Contributor, string>[] = ['login', 'contributions'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly cardService: CartService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.cardService.getCart()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(elements => {
        this.cardElements = elements;
        this.changeDetectorRef.markForCheck();
      })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
