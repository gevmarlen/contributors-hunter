import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { cartItems } from '../../../test/services/cart.mock';
import { CartService } from '../../services/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [MatTableModule, MatButtonModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        CartService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cart items', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('.mat-row').length).toBe(0);
    cartItems.forEach(item => {
      cartService.addToCart(item);
    });
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.mat-row').length).toBe(3);
  });
});
