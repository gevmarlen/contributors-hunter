import { TestBed } from '@angular/core/testing';
import { repositories } from '../../test/services/api.mock';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let dashboardService: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dashboardService = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });

  it('should emit repositories', () => {
    const spy = jest.fn();
    dashboardService.getRepositories().subscribe(spy);
    dashboardService.setRepositories(repositories);

    expect(spy).toBeCalledWith(repositories);
  });
});
