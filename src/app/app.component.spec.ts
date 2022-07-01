import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { contributors } from '../test/services/api.mock';
import { AppComponent } from './app.component';
import { CartService } from './services/cart.service';
import { LoaderService } from './services/loader.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let cartService: CartService;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        CartService,
        LoaderService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cartService = TestBed.inject(CartService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader while loading', () => {
    expect(fixture.debugElement.query(By.css('.loader'))).toBeFalsy();
    loaderService.setLoader(true)
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loader'))).toBeTruthy();
  });

  it('should show correct number of cart elements', () => {
    const cartButton = fixture.debugElement.query(By.css('.cart-button'));
    expect(cartButton.nativeElement.textContent.trim()).toContain('cart: 0');
    cartService.addToCart(contributors[0]);
    fixture.detectChanges()
    expect(cartButton.nativeElement.textContent.trim()).toContain('cart: 1');
  });
});
