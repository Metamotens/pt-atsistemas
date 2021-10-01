import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Actor } from "../models/actor";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${ this.url }/actors`);
  }
}
