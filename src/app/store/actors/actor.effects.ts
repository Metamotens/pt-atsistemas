import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { ActorService } from "../../core/services/actor.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { getActorsByIds, getActorsByIdsFailure, getActorsByIdsSuccess } from "./actor.actions";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ActorEffect {

  constructor(private actions$: Actions,
              private actorScv: ActorService,
              private toastrSvc: ToastrService,
              private translateSvc: TranslateService) {
  }

  getActorsByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActorsByIds),
      switchMap(({ ids }) =>
        this.actorScv.getActorsByIds(ids).pipe(
          map(actors => getActorsByIdsSuccess({ actors })),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.actors'));
            return of(getActorsByIdsFailure({ error: error.message }));
          })
        )
      )
    )
  )
}
