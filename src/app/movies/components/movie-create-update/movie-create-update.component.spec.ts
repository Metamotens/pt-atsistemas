import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreateUpdateComponent } from './movie-create-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from "@ng-select/ng-select";

describe('MovieCreateComponent', () => {
  let component: MovieCreateUpdateComponent;
  let fixture: ComponentFixture<MovieCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCreateUpdateComponent],
      imports: [TranslateModule.forRoot({}), RouterTestingModule, NgSelectModule, ReactiveFormsModule, FormsModule],
      providers: [provideMockStore({}), FormBuilder]
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
