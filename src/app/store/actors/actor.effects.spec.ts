import { ActorEffect } from './actor.effects';
import { ActorService } from '../../core/services/actor.service';
import { TestBed } from '@angular/core/testing';
import { HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateModule } from '@ngx-translate/core';
import { getActors, getActorsByIds, getActorsByIdsSuccess, getActorsSuccess } from './actor.actions';
import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { Actor } from '../../core/models/actor';

describe('ActorEffects', () => {
  let actions$: Actions;
  let effects: ActorEffect;
  let testScheduler: TestScheduler;
  const actorSvc = jasmine.createSpyObj('actorService', [
    'getActors',
    'getActorsByIds'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({})
      ],
      providers: [
        HttpHandler,
        ActorEffect,
        provideMockActions(() => actions$),
        { provide: ActorService, useValue: actorSvc }
      ]
    });

    effects = TestBed.inject(ActorEffect);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get list of actors', () => {
    const actors: Actor[] = [];
    const action = getActors();
    const outcome = getActorsSuccess({ actors });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: actors });
      actorSvc.getActors.and.returnValue(response);

      expectObservable(effects.getActors$).toBe('--b', { b: outcome });
    });
  });

  it('should get list of actors by id', () => {
    const ids = [1, 2];
    const actors: Actor[] = [
      {
        'id': 1,
        'fullName': 'Isaak McQuode',
        'gender': 'Male',
        'bornCity': 'Ciduren',
        'birthdate': '24/12/1957',
        'img': 'http://dummyimage.com/600x400.png/dddddd/000000',
        'rating': 2.03,
        'movies': [
          3,
          7
        ]
      },
      {
        'id': 2,
        'fullName': 'Rory Chanders',
        'gender': 'Male',
        'bornCity': 'Cijengkol',
        'birthdate': '19/04/1975',
        'img': 'http://dummyimage.com/600x400.png/5fa2dd/000000',
        'rating': 2.43,
        'movies': []
      }
    ];
    const action = getActorsByIds({ ids });
    const outcome = getActorsByIdsSuccess({ actors });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: actors });
      actorSvc.getActorsByIds.and.returnValue(response);

      expectObservable(effects.getActorsByIds$).toBe('--b', { b: outcome });
    });
  });
});
