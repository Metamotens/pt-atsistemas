import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MovieEffect } from './movie.effects';
import { MovieService } from '../../core/services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import {
  deleteMovie,
  deleteMovieSuccess,
  getMovieById,
  getMovieByIdSuccess,
  getMovies,
  getMoviesSuccess,
  updateMovie,
  updateMovieSuccess
} from './movie.actions';
import { Movie } from '../../core/models/movie';
import { MovieListComponent } from "../../movies/components/movie-list/movie-list.component";

describe('ActorEffects', () => {
  let actions$: Actions;
  let effects: MovieEffect;
  let testScheduler: TestScheduler;
  const movieSvc = jasmine.createSpyObj('movieService', [
    'getMovies',
    'getMovieById',
    'createMovie',
    'updateMovie',
    'deleteMovie'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([{ path: 'movies', component: MovieListComponent }])
      ],
      providers: [
        HttpClient,
        HttpHandler,
        MovieEffect,
        provideMockActions(() => actions$),
        { provide: MovieService, useValue: movieSvc }
      ],
      declarations: [MovieListComponent]
    });

    effects = TestBed.inject(MovieEffect);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get list of movies', () => {
    const movies: Movie[] = [];
    const action = getMovies();
    const outcome = getMoviesSuccess({ movies });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: movies });
      movieSvc.getMovies.and.returnValue(response);

      expectObservable(effects.getMovies$).toBe('--b', { b: outcome });
    });
  });

  it('should get movie by id', () => {
    const id = 1;
    const movie: Movie = {
      'id': 1,
      'title': 'Dancing Lady',
      'poster': 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      'genre': [
        'Comedy',
        'Musical',
        'Romance'
      ],
      'year': 2006,
      'duration': 161,
      'imdbRating': 8.27,
      'actors': [
        4,
        5,
        6
      ],
      'company': 1
    };
    const action = getMovieById({ id });
    const outcome = getMovieByIdSuccess({ movie });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: movie });
      movieSvc.getMovieById.and.returnValue(response);

      expectObservable(effects.getMovieById$).toBe('--b', { b: outcome });
    });
  });

  it('should update movie', () => {
    const moviePartial: Partial<Movie> = {
      title: 'title',
      poster: 'poster',
      company: 1,
      year: 2021,
      duration: 123,
      imdbRating: 8, 'genre': ['Horror', 'Thriller'],
      actors: [5, 6]
    };
    const action = updateMovie({ moviePartial });
    const outcome = updateMovieSuccess();

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: moviePartial });
      movieSvc.updateMovie.and.returnValue(response);

      expectObservable(effects.updateMovie$).toBe('--b', { b: outcome });
    });
  });

  it('should delete movie', () => {
    const id = 1;
    const action = deleteMovie({ id });
    const outcome = deleteMovieSuccess();

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', {});
      movieSvc.deleteMovie.and.returnValue(response);

      expectObservable(effects.deleteMovie$).toBe('--b', { b: outcome });
    });
  });
});
