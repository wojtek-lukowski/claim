import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClaimDialogComponent } from './claim-dialog.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../shared/button-component/button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as ClaimActions from '../../store/claim.actions';
import { Claim, DamageCategory, DamageVehicleSubcategory } from '../../services/claim.service';
import { provideMockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

describe('ClaimDialogComponent (Template-Driven Forms)', () => {
  let component: ClaimDialogComponent;
  let fixture: ComponentFixture<ClaimDialogComponent>;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ClaimDialogComponent>;
  let store: Store;
  let dispatchSpy: jasmine.Spy;

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

  const mockStore = {
    select: jasmine.createSpy().and.returnValue(of([])),
    dispatch: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ClaimDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Store, useValue: mockStore },
        provideMockStore(),
      ],
      imports: [ButtonComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatDatepickerModule,
        QuillModule,
        CommonModule]
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
    dialogRef = dialog.open(ClaimDialogComponent);
    component = dialogRef.componentInstance;
    fixture = TestBed.createComponent(ClaimDialogComponent);
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should dispatch addClaim action on form submit', waitForAsync(() => {
  //   fixture.detectChanges();
  //   const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('pe-button'));
  //   console.log('buttons', buttons)
  // const submitButton = buttons.find(button => button.nativeElement.getAttribute('label') === 'Submit');
  // if (submitButton) {
  //   console.log('button found')
  //   submitButton.triggerEventHandler('onButtonClick', null);
  //   fixture.detectChanges();
  // }

  // expect(dispatchSpy).toHaveBeenCalledWith(ClaimActions.createClaim({ claim }));
  // }))

  // it('should mark id as invalid if empty', async () => {
  //   // await fixture.whenStable();
  //   const idInput = fixture.debugElement.query(By.css('input[name="id"]')).nativeElement;
  //   idInput.value = '';
  //   idInput.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();

  //   expect(idInput.classList).toContain('ng-invalid');
  // });

});
