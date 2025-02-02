import { createReducer, on } from '@ngrx/store';
import { initialClaimState, ClaimState } from './claim.state';
import * as ClaimActions from './claim.actions';
import { Claim } from '../services/claim.service'

export const claimReducer = createReducer(
  initialClaimState,

  on(ClaimActions.loadClaims, (state) => {
    return {
      ...state
    }
  }),

  on(ClaimActions.loadClaimsSuccess, (state, { claims }) => {
    return {
      ...state,
      claims
    }
  }),

  on(ClaimActions.setCurrentClaim, (state, { claim }) => {
    return {
      ...state,
      currentClaim: claim,
    }
  }),

  on(ClaimActions.createClaim, (state, { claim }) => {
    if (claim) {
      const updatedClaims = [...state.claims, claim];
      return { ...state, claims: updatedClaims }
    }
    return state;
  }),

  on(ClaimActions.editClaim, (state, { claim }) => {
    if (claim) {
      const updatedClaims = state.claims.map((c) =>
        c.id == claim.id ? claim : c);
      return { ...state, claims: updatedClaims }
    }
    return state;
  }),

  on(ClaimActions.cancelClaim, (state) => {
    return state;
  }),

  on(ClaimActions.deleteClaim, (state, { claim }) => {
    if (claim) {
      const updatedClaims = state.claims.filter((c) => c.id !== claim.id);
      return { ...state, claims: updatedClaims }
    }
    return state;
  })
)
