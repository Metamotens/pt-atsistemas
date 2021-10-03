import { Company } from "../../core/models/company";
import { createReducer, on } from "@ngrx/store";
import { getCompanyById, getCompanyByIdFailure, getCompanyByIdSuccess } from "./company.actions";

export interface CompanyState {
  companies: Company[],
  company: Company | null,
  loading: boolean,
  error: boolean
}

export const initialState: CompanyState = {
  companies: [],
  company: null,
  loading: false,
  error: false
}

export const companyReducer = createReducer(
  initialState,
  on(getCompanyById, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getCompanyByIdSuccess, (state, action) => {
    return {
      ...state,
      company: action.company,
      loading: false
    }
  }),
  on(getCompanyByIdFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
)
