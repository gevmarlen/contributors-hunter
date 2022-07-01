import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { organizations, repositories } from '../../../test/services/api.mock';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        ApiService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Organization not found" message', () => {
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => of([]));
    component.onSubmit();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Organization not found');
  });

  it('should show "Repositories not found" message', () => {
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => of(organizations));
    jest.spyOn(apiService, 'getOrganizationRepositories').mockImplementation(() => of([]));
    component.onSubmit();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Repositories not found');
  });

  it('should show repository list', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('.list-item').length).toBe(0);
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => of(organizations));
    jest.spyOn(apiService, 'getOrganizationRepositories').mockImplementation(() => of(repositories));
    component.onSubmit();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.list-item').length).toBe(3);
  });
});
