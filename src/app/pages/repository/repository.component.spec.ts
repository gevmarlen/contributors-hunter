import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
      imports: [MatListModule, MatButtonModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: convertToParamMap({ org: 'micro', repo: 'micro' })}}
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
    expect(fixture.debugElement.query(By.css('.contributor__name'))).toBeTruthy();
  });

  it('should disable "Add to cart" button if contributor already in cart', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.contributor button').disabled).toBeTruthy();
  });
});
