import { createAction, props } from '@ngrx/store';
import { Claim } from '../services/claim.service';

export const loadClaims = createAction('[Claim] Load Claims');

export const loadClaimsSuccess = createAction(
  '[Claim] Load Claims Success',
  props<{ claims: Claim[] }>()
);

export const setCurrentClaim = createAction(
  '[Claim] Set Current Claim',
  props<{ claim: Claim | null }>()
);

export const createClaim = createAction(
  '[Claim] Create New Claim',
  props<{ claim: Claim | null }>()
);

export const editClaim = createAction(
  '[Claim] Edit Claim',
  props<{ claim: Claim | null }>()
);

export const deleteClaim = createAction(
  '[Claim] Delete Claim',
  props<{ claim: Claim | null }>()
);

export const cancelClaim = createAction(
  '[Claim] Cancel Claim'
);
