import { createAction, props } from "@ngrx/store";
import { Company } from "../../core/models/company";

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
