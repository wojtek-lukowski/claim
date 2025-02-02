import { claimReducer } from './claim.reducer';
import { initialClaimState, ClaimState } from './claim.state';
import * as ClaimActions from './claim.actions';
import { Claim, DamageCategory, DamageVehicleSubcategory } from '../services/claim.service';

describe('Claim Reducer', () => {

  let claim: Claim;
  let initialClaimState: ClaimState;

  beforeEach(() => {
    claim = {
      id: '0',
      policyholderName: 'Test',
      incidentDate: '1.1.2000',
      damageCategory: DamageCategory.Vehicle,
      damageSubcategory: DamageVehicleSubcategory.Accident,
      description: 'Boom',
      estimatedRepairCost: null,
      status: 'Pending'
    };

    initialClaimState = {
      claims: [],
      currentClaim: null
    }
  });

  it('should return unchanged state when [Load Claims] action is dispatched', () => {

    // console.log('initial state', initialClaimState)
    // const action = ClaimActions.loadClaims();
    // const newState = claimReducer(initialClaimState, action);

    // expect(newState).toEqual(initialClaimState);
  });


  // it('should craete a new claim when [Create Claim] action is dispatched', () => {
  //   const action = ClaimActions.createClaim({ claim });
  //   const newState = claimReducer(initialClaimState, action);

  //   expect(newState.claims.length).toBe(1);
  //   expect(newState.claims[0]).toEqual(claim);
  // });


});
