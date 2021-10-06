import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
    url: '/movies/create'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({}),
        {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Click and route to create movie', () => {
    const routerSvc = TestBed.inject(Router);

    const addMovieBtn = fixture.debugElement.query(By.css('.fixed'));
    addMovieBtn.triggerEventHandler('click', {});

    expect(routerSvc.navigate).toHaveBeenCalledWith(['/movies/create']);
  });
});
