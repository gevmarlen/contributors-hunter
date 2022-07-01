import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public loader!: boolean;
  public cartElements: number = 0;

  constructor(
    private readonly loaderService: LoaderService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cartService: CartService,
  ) {
  }

  public ngOnInit(): void {
    this.loaderService.getLoader()
      .subscribe(loader => {
        this.loader = loader;
        this.changeDetectorRef.markForCheck();
      });

    this.cartService.getCart()
      .subscribe(elements => {
        this.cartElements = elements.length;
        this.changeDetectorRef.markForCheck();
      })
  }
}
