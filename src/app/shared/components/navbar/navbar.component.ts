import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.states';
import { selectTitle } from '../../../store/title/title.selectors';
import { NavigationEnd, Router } from '@angular/router';
import { selectIsLoadingMovies } from '../../../store/movies/movie.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title: string = '';
  showArrowBack: boolean = false;
  loading$!: Observable<boolean>;

  @ViewChild('showHideMenu') sidenav!: ElementRef;

  constructor(private store$: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading$ = this.store$.select(selectIsLoadingMovies);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.showArrowBack = event.urlAfterRedirects !== '/movies';
    });
    this.store$.select(selectTitle).subscribe(value => this.title = value);
  }

  show() {
    this.sidenav.nativeElement.classList.remove('-translate-x-full');
  }

  hide() {
    this.sidenav.nativeElement.classList.add('-translate-x-full');
  }

  goBack() {
    this.router.navigateByUrl('/movies');
  }
}
