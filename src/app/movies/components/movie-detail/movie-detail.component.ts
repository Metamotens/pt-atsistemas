import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.states';
import { Store } from '@ngrx/store';
import { selectIsLoadingMovies, selectMovie } from '../../../store/movies/movie.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../core/models/movie';
import { getMovieById } from '../../../store/movies/movie.actions';
import { getActorsByIds } from '../../../store/actors/actor.actions';
import { selectActors } from '../../../store/actors/actor.selectors';
import { Observable, Subscription } from 'rxjs';
import { Actor } from '../../../core/models/actor';
import { getCompanyById } from '../../../store/companies/company.actions';
import { Company } from '../../../core/models/company';
import { selectCompany } from '../../../store/companies/company.selectors';
import { setTitle } from '../../../store/title/title.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movie!: Movie;
  company!: Company | null;
  actors$!: Observable<Actor[]>;
  loading$!: Observable<boolean>;
  deleteModal = false;
  movieSubscription$!: Subscription;

  constructor(private store$: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading$ = this.store$.select(selectIsLoadingMovies);

    const { id } = this.route.snapshot.params;
    this.store$.dispatch(getMovieById({ id }));

    this.movieSubscription$ = this.store$.select(selectMovie).subscribe(movie => {
      if (movie) {
        this.movie = movie;
        this.store$.dispatch(setTitle({ title: `${ movie.title } (${ movie.year })` }));
      }

      movie?.actors && this.store$.dispatch(getActorsByIds({ ids: movie.actors }));
      this.actors$ = this.store$.select(selectActors);

      if (movie?.company) {
        this.store$.dispatch(getCompanyById({ id: movie.company }));
        this.store$.select(selectCompany).pipe(take(2)).subscribe(company => this.company = company);
      }
    });
  }

  openDeleteModal() {
    this.disableScroll();
    this.deleteModal = !this.deleteModal;
  }

  disableScroll() {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  ngOnDestroy(): void {
    this.movieSubscription$.unsubscribe();
  }
}
