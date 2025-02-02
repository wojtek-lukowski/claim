import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, take } from 'rxjs/operators';
import {
  loadClaims,
  loadClaimsSuccess,
  createClaim,
  editClaim,
  deleteClaim
} from './claim.actions';
import { Claim } from '../services/claim.service';
import { ClaimState } from './claim.state';
import { selectAllClaims } from './claim.selectors';
import { HttpClient } from '@angular/common/http';
import { result } from 'lodash';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()

export class ClaimEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private baseUrl: string = '';

  constructor(
    private store: Store<ClaimState>
  ) {
  }

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadClaims),
      tap(action => {
      }),
      map(() => {
        let claims: Claim[] = [];
        const storedClaims = localStorage.getItem('claimList');
        if (storedClaims) {
          claims = JSON.parse(storedClaims) as Claim[];
        }
        // this.http.get<Claim[]>(`${this.baseUrl}/claims`).subscribe(result => {
        //   if (result) {
        //     claims = result;
        //   }
        //   return loadClaimsSuccess({ claims });
        // }, (error) => {
        //   return loadClaimsSuccess({ claims });
        // });
        return loadClaimsSuccess({ claims });
      })
    )
  );

  saveClaims$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createClaim, editClaim, deleteClaim),
        tap((action) => {
          this.store
            .select(selectAllClaims)
            .pipe(
              take(1),
              tap((claims) => {
                localStorage.setItem('claimList', JSON.stringify(claims));
                // switch (action.type) {
                //   case '[Claim] Create New Claim':
                //     this.http.post<Claim>(`${this.baseUrl}/createNewClaim`, action.claim).subscribe(result => {
                //     }, (error) => { });
                //     break;
                //   case '[Claim] Edit Claim':
                //     if (action.claim) {
                //       this.http.put<Claim>(`${this.baseUrl}/claims/${action.claim.id}`, action.claim.id).subscribe(result => {
                //       }, (error) => { });
                //     }
                //     break;
                //   case '[Claim] Delete Claim':
                //     if (action.claim) {
                //       this.http.delete<Claim>(`${this.baseUrl}/claims/${action.claim.id}`).subscribe(result => {
                //       }, (error) => { });
                //     }
                //     break;
                // }
              })
            )
            .subscribe();
        })
      ),
    { dispatch: false }
  );
}
