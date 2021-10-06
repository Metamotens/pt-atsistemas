import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDeleteComponent } from './movie-delete.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('MovieDeleteComponent', () => {
  let component: MovieDeleteComponent;
  let fixture: ComponentFixture<MovieDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDeleteComponent],
      imports: [TranslateModule.forRoot({})],
      providers: [provideMockStore({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
