import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Company } from "../models/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${ this.url }/companies`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${ this.url }/companies/${ id }`);
  }
}
