import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyEffect } from './company.effects';
import { CompanyService } from '../../core/services/company.service';
import { TestScheduler } from 'rxjs/testing';
import { Actions } from '@ngrx/effects';
import { getCompanies, getCompaniesSuccess, getCompanyById, getCompanyByIdSuccess } from './company.actions';
import { Company } from '../../core/models/company';

describe('ActorEffects', () => {
  let actions$: Actions;
  let effects: CompanyEffect;
  let testScheduler: TestScheduler;
  const companySvc = jasmine.createSpyObj('companyService', [
    'getCompanies',
    'getCompanyById'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({})
      ],
      providers: [
        HttpClient,
        HttpHandler,
        CompanyEffect,
        provideMockActions(() => actions$),
        { provide: CompanyService, useValue: companySvc }
      ]
    });

    effects = TestBed.inject(CompanyEffect);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get list of companies', () => {
    const companies: Company[] = [];
    const action = getCompanies();
    const outcome = getCompaniesSuccess({ companies });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: companies });
      companySvc.getCompanies.and.returnValue(response);

      expectObservable(effects.getCompanies$).toBe('--b', { b: outcome });
    });
  });

  it('should get company by id', () => {
    const id = 1;
    const company: Company = {
      'id': 1,
      'name': 'Jacobson-Dickinson',
      'country': 'Colombia',
      'createYear': 2010,
      'employees': 81,
      'rating': 4.32,
      'movies': [
        1,
        10
      ]
    };
    const action = getCompanyById({ id });
    const outcome = getCompanyByIdSuccess({ company });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: company });
      companySvc.getCompanyById.and.returnValue(response);

      expectObservable(effects.getCompanyById$).toBe('--b', { b: outcome });
    });
  });
});
