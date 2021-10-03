import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from "../../../../core/models/movie";
import { AppState } from "../../../../store/app.states";
import { Store } from "@ngrx/store";
import { deleteMovie } from 'src/app/store/movies/movie.actions';
import { Router } from "@angular/router";

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.scss']
})
export class MovieDeleteComponent {

  @Input() movie!: Movie;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private store$: Store<AppState>,
              private router: Router) {
  }

  cancel() {
    this.enableScroll();
    this.closeModal.emit(false);
  }

  deleteMovie() {
    this.enableScroll();
    this.closeModal.emit(false);
    this.store$.dispatch(deleteMovie({ id: this.movie.id }));
    this.router.navigate(['/movies']);
  }

  enableScroll() {
    window.onscroll = function () {
    };
  }
}
