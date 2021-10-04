import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.states";
import { selectActors } from "../../../store/actors/actor.selectors";
import { selectCompanies } from "../../../store/companies/company.selectors";
import { Actor } from "../../../core/models/actor";
import { Company } from "../../../core/models/company";
import { getActors } from "../../../store/actors/actor.actions";
import { getCompanies } from "../../../store/companies/company.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../core/models/movie";
import { selectMovie } from "../../../store/movies/movie.selectors";
import { setTitle } from "../../../store/title/title.actions";
import { createMovie, getMovieById, updateMovie } from "../../../store/movies/movie.actions";
import { Observable } from "rxjs";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create-update.component.html',
  styleUrls: ['./movie-create-update.component.scss']
})
export class MovieCreateUpdateComponent implements OnInit {

  actors$!: Observable<Actor[]>;
  companies$!: Observable<Company[]>;
  movie!: Movie | null;
  actors!: Actor[];
  genres!: string[];
  selectedActors!: Actor[];
  selectedGenres!: string[];
  form!: FormGroup;

  get formControls() {
    return this.form.controls;
  }

  constructor(private store$: Store<AppState>,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initForm();

    this.store$.dispatch(getActors());
    this.store$.dispatch(getCompanies());
    this.actors$ = this.store$.select(selectActors);
    this.companies$ = this.store$.select(selectCompanies);

    const { id } = this.route.snapshot.params;
    if (id) {
      this.store$.dispatch(getMovieById({ id: +id }));
      this.store$.select(selectMovie).subscribe(movie => {
        if (movie) {
          this.movie = movie;
          this.store$.dispatch(setTitle({ title: 'Editar pelicula' }));
          this.completeForm();
        }
      });
    } else {
      this.store$.dispatch(setTitle({ title: 'Nueva pelicula' }))
    }
  }

  public disableSubmitBtn(): boolean {
    return this.form?.invalid || (!this.selectedActors ||
        (this.selectedActors && this.selectedActors.length === 0)) ||
      (!this.selectedGenres || (this.selectedGenres && this.selectedGenres.length === 0))
  }

  public save() {
    if (this.form.valid) {
      const movie: Partial<Movie> = {
        title: this.formControls.title.value.trim(),
        poster: this.formControls.poster.value.trim(),
        company: +this.formControls.company.value,
        year: +this.formControls.year.value,
        duration: +this.formControls.duration.value,
        imdbRating: +this.formControls.score.value,
        genre: this.selectedGenres,
        actors: this.selectedActors.map((actor: Actor) => actor.id)
      };

      if (this.movie && this.movie.id) {
        console.log()
        movie.id = this.movie.id;
        this.store$.dispatch(updateMovie({ moviePartial: movie }));
      } else {
        this.store$.dispatch(createMovie({ moviePartial: movie }));
      }
    }
  }

  public addGenre(name: string): string {
    return name;
  }

  private initForm(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.form = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'poster': ['', [Validators.required, Validators.pattern(urlRegex)]],
      'company': [null, [Validators.required]],
      'year': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
      'duration': ['', [Validators.required]],
      'score': ['', [Validators.required]]
    });
  }

  private completeForm(): void {
    if (this.movie) {
      this.selectedGenres = this.movie.genre;

      this.actors$.subscribe(actors => this.selectedActors = actors.filter(actor => this.movie?.actors.includes(actor.id))).unsubscribe();

      this.formControls.title.setValue(this.movie.title);
      this.formControls.poster.setValue(this.movie.poster);
      this.formControls.company.setValue(this.movie.company);
      this.formControls.year.setValue(this.movie.year);
      this.formControls.duration.setValue(this.movie.duration);
      this.formControls.score.setValue(this.movie.imdbRating);
    }
  }
}
