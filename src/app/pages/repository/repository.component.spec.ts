import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { contributors } from '../../../test/services/api.mock';
import { ApiService } from '../../core/api/api.service';
import { CartService } from '../../services/cart.service';

import { RepositoryComponent } from './repository.component';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: convertToParamMap({ repo: 'test/micro' })}}
        },
        MockProvider(ApiService, {
          getContributors: () => of(contributors),
        }),
        MockProvider(CartService, {
          has: (contributor) => !!contributors.find(fakeContributor => fakeContributor.id === contributor.id),
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(  () => {
    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have back button', () => {
    expect(fixture.debugElement.query(By.css('.back-button'))).toBeTruthy();
  });

  it('should show contributors list', () => {
    expect(fixture.debugElement.query(By.css('.contributor'))).toBeTruthy();
  });

  it('should disable "Add to cart" button if contributor already in cart', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.contributor button').disabled).toBeTruthy();
  });
});
