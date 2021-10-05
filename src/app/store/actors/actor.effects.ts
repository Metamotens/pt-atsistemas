import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { ActorService } from "../../core/services/actor.service";
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from "rxjs";
import {
  getActors,
  getActorsByIds,
  getActorsByIdsFailure,
  getActorsByIdsSuccess,
  getActorsFailure,
  getActorsSuccess
} from "./actor.actions";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ActorEffect {

  constructor(private actions$: Actions,
              private actorScv: ActorService,
              private toastrSvc: ToastrService,
              private translateSvc: TranslateService,
              private spinnerSvc: NgxSpinnerService) {
  }

  getActors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActors),
      switchMap(() =>
        this.actorScv.getActors().pipe(
          map(actors => getActorsSuccess({ actors })),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.actors'));
            return of(getActorsFailure({ error: error.message }));
          })
        )
      )
    )
  )

  getActorsByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActorsByIds),
      tap(() => this.spinnerSvc.show()),
      switchMap(({ ids }) =>
        this.actorScv.getActorsByIds(ids).pipe(
          map(actors => getActorsByIdsSuccess({ actors })),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.actors'));
            return of(getActorsByIdsFailure({ error: error.message }));
          }),
          tap(() => this.spinnerSvc.hide()),
        )
      )
    )
  )
}
