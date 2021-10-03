import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.states";
import { selectActors } from "../../../store/actors/actor.selectors";
import { selectCompanies } from "../../../store/companies/company.selectors";
import { Actor } from "../../../core/models/actor";
import { Company } from "../../../core/models/company";
import { getActors } from "../../../store/actors/actor.actions";
import { getCompanies } from "../../../store/companies/company.actions";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../core/models/movie";
import { selectMovie } from "../../../store/movies/movie.selectors";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create-update.component.html',
  styleUrls: ['./movie-create-update.component.scss']
})
export class MovieCreateUpdateComponent implements OnInit {

  movie!: Movie | null;
  actors!: Actor[];
  companies!: Company[];
  genres!: string[];
  selectedActors!: Actor[];
  selectedGenres!: string[];
  form: FormGroup;

  get formControls() {
    return this.form.controls;
  }

  constructor(private store$: Store<AppState>,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      'title': new FormControl('', [Validators.required]),
      'poster': new FormControl('', [Validators.required]),
      'company': new FormControl(null, [Validators.required]),
      'year': new FormControl('', [Validators.required]),
      'duration': new FormControl('', [Validators.required]),
      'score': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    if (id) this.store$.select(selectMovie).subscribe(movie => this.movie = movie);

    this.store$.dispatch(getActors());
    this.store$.dispatch(getCompanies());

    this.store$.select(selectActors).subscribe(actors => this.actors = actors);
    this.store$.select(selectCompanies).subscribe(companies => this.companies = companies);
  }

  public saveMovie(): void {
  }

  public updateMovie(): void {

  }

  public addGenre(name: string): string {
    return name;
  }
}
