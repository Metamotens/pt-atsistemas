import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Actor } from "../models/actor";
import { map } from "rxjs/operators";

type ActorDb = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  bornCity: string;
  birthdate: string;
  img: string;
  rating: number;
  movies: number[];
};

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

  getActorsByIds(ids: number[]): Observable<Actor[]> {
    let params = new HttpParams();
    ids.forEach(id => params = params.append('id', id));
    return this.http.get<ActorDb[]>(`${ this.url }/actors`, { params }).pipe(
      map(actorsDb => this.actorDbToActor(actorsDb))
    );
  }

  private actorDbToActor(actors: ActorDb[]): Actor[] {
    return actors.map((actorDb: ActorDb) => ({
      id: actorDb.id,
      fullName: `${ actorDb?.first_name } ${ actorDb?.last_name }`,
      gender: actorDb.gender,
      bornCity: actorDb.bornCity,
      birthdate: actorDb.birthdate,
      img: actorDb.img,
      rating: actorDb.rating,
      movies: actorDb.movies
    }));
  }
}
