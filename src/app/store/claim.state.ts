import { Claim } from '../services/claim.service';

export interface ClaimState {
  claims: Claim[],
  currentClaim: Claim | null
}

export const initialClaimState: ClaimState = {
  claims: JSON.parse(localStorage.getItem('claimList') as any || []),
  currentClaim: null
}

