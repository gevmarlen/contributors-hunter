import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should emit loader state', () => {
    const spy = jest.fn();
    loaderService.getLoader().subscribe(spy);
    loaderService.setLoader(true);

    expect(spy).toBeCalledWith(true);
  });
});
