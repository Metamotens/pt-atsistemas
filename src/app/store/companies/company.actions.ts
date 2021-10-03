import { createAction, props } from "@ngrx/store";
import { Company } from "../../core/models/company";

export const getCompanies = createAction(
  '[COMPANIES] Get companies'
)

export const getCompaniesSuccess = createAction(
  '[COMPANIES] Get companies success',
  props<{ companies: Company[] }>()
)

export const getCompaniesFailure = createAction(
  '[COMPANIES] Get companies failure',
  props<{ error: any }>()
)

export const getCompanyById = createAction(
  '[COMPANIES] Get company by id',
  props<{ id: number }>()
)

export const getCompanyByIdSuccess = createAction(
  '[COMPANIES] Get company by id success',
  props<{ company: Company }>()
)

export const getCompanyByIdFailure = createAction(
  '[COMPANIES] Get company by id failure',
  props<{ error: any }>()
)
