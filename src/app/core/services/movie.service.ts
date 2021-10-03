import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${ this.url }/movies`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${ this.url }/movies/${ id }`);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${ this.url }/movies/${ id }`);
  }
}
