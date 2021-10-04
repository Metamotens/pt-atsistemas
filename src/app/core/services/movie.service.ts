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

  createMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(`${ this.url }/movies`, movie);
  }

  updateMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${ this.url }/movies/${ movie.id }`, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${ this.url }/movies/${ id }`);
  }
}
