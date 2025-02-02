import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClaimState } from './claim.state';

export const selectClaimState = createFeatureSelector<ClaimState>('claims');

export const selectAllClaims = createSelector(
  selectClaimState,
  (state) => state.claims
);

export const selectCurrentClaim = createSelector(
  selectClaimState,
  (state) => state.currentClaim
);
