import { CompanyState } from "../companies/company.reducers";
import * as fromSelectors from "../companies/company.selectors";

describe('Company selectors', () => {
  const initialState: CompanyState = {
    companies: [
      {
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
      }
    ],
    company: {
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
    loading: false,
    error: false
  }

  it('should get list of companies', () => {
    const result = fromSelectors.selectCompanies.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(2);
  });

  it('should get company', () => {
    const result = fromSelectors.selectCompany.projector(initialState);
    expect(result?.id).toEqual(1);
  });
});
