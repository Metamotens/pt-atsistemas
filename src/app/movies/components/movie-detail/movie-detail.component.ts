import { Component, OnInit } from '@angular/core';
import { AppState } from "../../../store/app.states";
import { Store } from "@ngrx/store";
import { selectMovie } from "../../../store/movies/movie.selectors";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../core/models/movie";
import { getMovieById } from "../../../store/movies/movie.actions";
import { getActorsByIds } from "../../../store/actors/actor.actions";
import { selectActors } from "../../../store/actors/actor.selectors";
import { Observable } from "rxjs";
import { Actor } from "../../../core/models/actor";
import { getCompanyById } from "../../../store/companies/company.actions";
import { Company } from "../../../core/models/company";
import { selectCompany } from "../../../store/companies/company.selectors";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie!: Movie;
  company!: Company | null;
  actors$!: Observable<Actor[]>;

  constructor(private store$: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.store$.dispatch(getMovieById({ id }));
    this.store$.select(selectMovie).subscribe(movie => {
      if (movie) this.movie = movie;

      movie?.actors && this.store$.dispatch(getActorsByIds({ ids: movie.actors }));
      this.actors$ = this.store$.select(selectActors);

      if (movie?.company) {
        this.store$.dispatch(getCompanyById({ id: movie.company }))
        this.store$.select(selectCompany).subscribe(company => this.company = company)
      }
    });
  }
}
