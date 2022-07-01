import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { organizations, repositories } from '../../../test/services/api.mock';
import { ApiService } from '../../core/api/api.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
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
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => throwError(() => new Error()));
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
    expect(fixture.debugElement.nativeElement.querySelectorAll('.mat-row').length).toBe(0);
    jest.spyOn(apiService, 'getOrganization').mockImplementation(() => of(organizations));
    jest.spyOn(apiService, 'getOrganizationRepositories').mockImplementation(() => of(repositories));
    component.onSubmit();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.mat-row').length).toBe(3);
  });
});
