import { selectAllClaims, selectCurrentClaim } from "./claim.selectors";
import { Claim, DamageCategory, DamageVehicleSubcategory } from '../services/claim.service';
import { ClaimState } from "./claim.state";

describe('Claim Selectors', () => {

  const claim: Claim = {
    id: '0',
    policyholderName: 'Test',
    incidentDate: '1.1.2000',
    damageCategory: DamageCategory.Vehicle,
    damageSubcategory: DamageVehicleSubcategory.Accident,
    description: 'Boom',
    estimatedRepairCost: null,
    status: 'Pending'
  };

  const state: ClaimState = {
    claims: [claim],
    currentClaim: claim
  }

  it('should select all claims', () => {
    const result = selectAllClaims.projector(state);

    expect(result.length).toBe(1);
    expect(result).toEqual([claim])
  });

  it('should select current claim', () => {
    const result = selectCurrentClaim.projector(state);

    expect(result).toEqual(claim);
  });

})
