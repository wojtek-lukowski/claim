import { Claim, DamageCategory, DamageVehicleSubcategory } from '../services/claim.service';
import * as ClaimActions from './claim.actions';

describe('Claim Actions', () => {
  const claim: Claim = {
    id: '0',
    policyholderName: 'Test',
    incidentDate: '1.1.2000',
    damageCategory: DamageCategory.Vehicle,
    damageSubcategory: DamageVehicleSubcategory.Accident,
    description: 'Boom',
    estimatedRepairCost: null,
    status: 'Pending'
  }
  const claims: Claim[] = [claim, claim];

  it('should create [Create New Claim] action with the correct payload', () => {
    const action = ClaimActions.createClaim({ claim });

    expect(action.type).toBe('[Claim] Create New Claim');
    expect(action.claim).toEqual(claim);
  });

  it('should create a [Delete Claim] action with the correct payload', () => {
    const action = ClaimActions.deleteClaim({ claim });

    expect(action.type).toBe('[Claim] Delete Claim');
    expect(action.claim).toEqual(claim);
  });

  it('should create a [Edit Claim] action with the correct payload', () => {
    const action = ClaimActions.editClaim({ claim });

    expect(action.type).toBe('[Claim] Edit Claim');
    expect(action.claim).toEqual(claim);
  });

  it('should create a [Set Current Claim] action with the correct payload', () => {
    const action = ClaimActions.setCurrentClaim({ claim });

    expect(action.type).toBe('[Claim] Set Current Claim');
    expect(action.claim).toEqual(claim);
  });

  it('should create a [Load Claims Success] action with the correct payload', () => {
    const action = ClaimActions.loadClaimsSuccess({ claims });

    expect(action.type).toBe('[Claim] Load Claims Success');
    expect(action.claims).toEqual(claims);
  });

  it('should create a [Cancel Claim] action', () => {
    const action = ClaimActions.cancelClaim();

    expect(action.type).toBe('[Claim] Cancel Claim');
  });

  it('should create a [Load Claims] action', () => {
    const action = ClaimActions.loadClaims();

    expect(action.type).toBe('[Claim] Load Claims');
  });
});
