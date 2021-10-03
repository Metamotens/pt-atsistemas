import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreateUpdateComponent } from './movie-create-update.component';

describe('MovieCreateComponent', () => {
  let component: MovieCreateUpdateComponent;
  let fixture: ComponentFixture<MovieCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
