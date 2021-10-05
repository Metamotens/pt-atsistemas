import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from "rxjs";
import {
  getCompanies,
  getCompaniesFailure,
  getCompaniesSuccess,
  getCompanyById,
  getCompanyByIdFailure,
  getCompanyByIdSuccess
} from "./company.actions";
import { CompanyService } from "../../core/services/company.service";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class CompanyEffect {

  constructor(private actions$: Actions,
              private companySvc: CompanyService,
              private toastrSvc: ToastrService,
              private translateSvc: TranslateService,
              private spinnerSvc: NgxSpinnerService) {
  }

  getCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCompanies),
      switchMap(() =>
        this.companySvc.getCompanies().pipe(
          map(companies => getCompaniesSuccess({ companies })),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.companies'));
            return of(getCompaniesFailure({ error: error.message }));
          })
        )
      )
    )
  )

  getCompanyById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCompanyById),
      tap(() => this.spinnerSvc.show()),
      switchMap(({ id }) =>
        this.companySvc.getCompanyById(id).pipe(
          map(company => getCompanyByIdSuccess({ company })),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.company'));
            return of(getCompanyByIdFailure({ error: error.message }));
          }),
          tap(() => this.spinnerSvc.hide()),
        )
      )
    )
  )
}
