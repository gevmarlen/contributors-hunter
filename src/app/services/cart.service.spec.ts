import { TestBed } from '@angular/core/testing';
import { contributors, repositories } from '../../test/services/api.mock';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cartService = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('should emit cart item', () => {
    const spy = jest.fn();
    cartService.getCart().subscribe(spy);
    cartService.addToCart(contributors[0]);

    expect(spy).toBeCalledWith([contributors[0]]);
  });

  it('should check item availability', () => {
    cartService.addToCart(contributors[0]);
    expect(cartService.has(contributors[1])).toBe(false);
    expect(cartService.has(contributors[0])).toBe(true);
  });
});
