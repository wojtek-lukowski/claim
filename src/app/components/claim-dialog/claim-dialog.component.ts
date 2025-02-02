import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button-component/button.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Claim,
  ClaimStatus,
  DamageCategory,
  DamagePropertySubcategory,
  DamageVehicleSubcategory,
  ClaimService
} from '../../services/claim.service';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Store } from '@ngrx/store';
import { ClaimState } from '../../store/claim.state';
import { selectCurrentClaim } from '../../store/claim.selectors';
import { Observable, take } from 'rxjs';
import { cancelClaim, createClaim, deleteClaim, editClaim, setCurrentClaim } from '../../store/claim.actions';
import { CommonModule } from '@angular/common';

interface EnumObject {
  key: string,
  value: string
}

enum OperationType {
  Submit,
  Edit,
  Cancel,
  Delete
}

@Component({
  selector: 'pe-claim-dialog',
  templateUrl: './claim-dialog.component.html',
  styleUrl: './claim-dialog.component.css',
  standalone: true,
  imports: [ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    QuillModule,
    CommonModule
  ],
  providers: [ClaimService],
  template: `
    <!-- <mat-form-field> -->
    <div>
      <mat-label>Claim Description</mat-label>
      <quill-editor [(ngModel)]="claimDescription"></quill-editor>
    </div>
    <!-- </mat-form-field> -->
  `
})

export class ClaimDialogComponent {

  public header: string = 'Claim';
  public idLabel: string = 'ID';
  public policyholderLabel: string = 'Policyholder name';
  public incidentDateLabel: string = 'Incident date';
  public damageCategoryLabel: string = 'Damage Category';
  public damageSubategoryLabel: string = 'Damage Subcategory';
  public statusLabel: string = 'Status';
  public descriptionLabel: string = 'Description';
  public estimatedCostLabel: string = 'Estimated cost';
  public claimDescription = 'Edit this text...';

  public claim!: any;
  public damageCategoryList: EnumObject[] = [];
  public subCategoryList: EnumObject[] = [];
  public statusList: EnumObject[] = [];
  public isNew!: boolean;
  public isIdFieldDisabled: boolean = false;
  public originalClaim!: Claim;
  public currentClaim$!: Observable<Claim | null>;

  public operationType = OperationType;

  constructor(
    private dialog: MatDialogRef<ClaimDialogComponent>,
    private store: Store<ClaimState>,
    private claimService: ClaimService,
  ) {
    this.currentClaim$ = this.store.select(selectCurrentClaim);
  }

  ngOnInit(): void {
    this.currentClaim$.pipe(take(1)).subscribe(claim => {
      if (claim) {
        this.claim = { ...claim };
        this.isNew = false;
        this.isIdFieldDisabled = true;
        this.subCategoryList = this.setSubcategories();
        this.header = 'Edit claim';
      } else {
        this.claim = this.claimService.new();
        this.header = 'Create a new Claim';
        this.isNew = true;
      }
    })
    this.createLists();
  }

  public closeDialog(operation: OperationType): void {
    const claim: Claim = this.claim;
    switch (operation) {
      case OperationType.Submit:
        this.isNew ? this.store.dispatch(createClaim({ claim })) : this.store.dispatch(editClaim({ claim }))
        break;
      case OperationType.Cancel:
        this.store.dispatch(cancelClaim());
        break;
      case OperationType.Delete:
        this.store.dispatch(deleteClaim({ claim }));
        break;
    }
    this.store.dispatch(setCurrentClaim({ claim: null }));
    this.dialog.close();
  }

  public onCategoryChange(): void {
    this.claim.damageSubcategory = null;
    this.subCategoryList = this.setSubcategories();
  }

  public setSubcategories(): EnumObject[] {
    switch (this.claim?.damageCategory) {
      case (DamageCategory.Property):
        return Object.entries(DamagePropertySubcategory).map(([key, value]) => ({
          key,
          value
        }));
      case (DamageCategory.Vehicle):
        return Object.entries(DamageVehicleSubcategory).map(([key, value]) => ({
          key,
          value
        }));
      default:
        return [];
    }
  }

  private createLists(): void {
    this.damageCategoryList = Object.entries(DamageCategory).map(([key, value]) => ({
      key,
      value
    }));

    this.statusList = Object.entries(ClaimStatus).map(([key, value]) => ({
      key,
      value
    }));
  }

}
