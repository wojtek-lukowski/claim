import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { loadClaims, loadClaimsSuccess } from './claim.actions';
import { ClaimEffects } from './claim.effects';
import { Claim, DamageCategory, DamageVehicleSubcategory } from '../services/claim.service';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClaimEffects', () => {
  let actions$: Observable<any>;
  let effects: ClaimEffects;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClaimEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ClaimEffects);
  });

  it('should load claims from local storage and dispatch loadClaimsSuccess', (done) => {
    const claims: Claim[] = [{
      id: '0',
      policyholderName: 'Test',
      incidentDate: '1.1.2000',
      damageCategory: DamageCategory.Vehicle,
      damageSubcategory: DamageVehicleSubcategory.Accident,
      description: 'Boom',
      estimatedRepairCost: null,
      status: 'Pending'
    }]

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(claims));

    actions$ = of(loadClaims());

    effects.loadClaims$.subscribe(result => {
      expect(result).toEqual(loadClaimsSuccess({ claims: claims }));
      done();
    });

  });
});
