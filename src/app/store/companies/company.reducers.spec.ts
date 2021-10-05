import * as fromReducer from "../companies/company.reducers";
import { CompanyState } from "../companies/company.reducers";
import {
  getCompanies,
  getCompaniesFailure,
  getCompaniesSuccess,
  getCompanyById,
  getCompanyByIdFailure
} from "./company.actions";

describe('Company reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('getCompanies action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromReducer;
      const newState: CompanyState = {
        companies: [],
        company: null,
        loading: true,
        error: false
      }

      const action = getCompanies();
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getCompaniesSuccess action', () => {
    it('should retrieve list of companies successfully', () => {
      const { initialState } = fromReducer;
      const newState: CompanyState = {
        companies: [{
          "id": 1,
          "name": "Jacobson-Dickinson",
          "country": "Colombia",
          "createYear": 2010,
          "employees": 81,
          "rating": 4.32,
          "movies": [
            1,
            10
          ]
        },
          {
            "id": 2,
            "name": "Quitzon-Erdman",
            "country": "China",
            "createYear": 2005,
            "employees": 611,
            "rating": 8.19,
            "movies": [
              2,
              3,
              4
            ]
          }],
        company: null,
        loading: false,
        error: false
      }

      const action = getCompaniesSuccess({ companies: newState.companies });
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getCompaniesFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: CompanyState = {
        companies: [],
        company: null,
        loading: false,
        error: true
      }

      const action = getCompaniesFailure({ error: true });
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getCompanyById action', () => {
    it('should set loading to true', () => {
      const id = 1;
      const { initialState } = fromReducer;
      const newState: CompanyState = {
        companies: [],
        company: null,
        loading: true,
        error: false
      }

      const action = getCompanyById({ id });
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getCompanyByIdSuccess action', () => {
    it('should retrieve company successfully', () => {
      const { initialState } = fromReducer;
      const newState: CompanyState = {
        companies: [{
          "id": 1,
          "name": "Jacobson-Dickinson",
          "country": "Colombia",
          "createYear": 2010,
          "employees": 81,
          "rating": 4.32,
          "movies": [
            1,
            10
          ]
        },
          {
            "id": 2,
            "name": "Quitzon-Erdman",
            "country": "China",
            "createYear": 2005,
            "employees": 611,
            "rating": 8.19,
            "movies": [
              2,
              3,
              4
            ]
          }],
        company: null,
        loading: false,
        error: false
      }

      const action = getCompaniesSuccess({ companies: newState.companies });
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getCompanyByIdFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: CompanyState = {
        companies: [],
        company: null,
        loading: false,
        error: true
      }

      const action = getCompanyByIdFailure({ error: true });
      const state = fromReducer.companyReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
