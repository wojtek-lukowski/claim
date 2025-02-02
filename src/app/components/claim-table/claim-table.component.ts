import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllClaims } from '../../store/claim.selectors';
import { setCurrentClaim, loadClaims } from '../../store/claim.actions';
import { ButtonComponent } from "../../shared/button-component/button.component";
import { ClaimService, Claim } from '../../services/claim.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ClaimDialogComponent } from '../claim-dialog/claim-dialog.component';
import { ClaimState } from '../../store/claim.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrl: './claim-table.component.css',
  imports: [ButtonComponent, MatTableModule, CommonModule],
  providers: [ClaimService, ClaimDialogComponent]
})

export class ClaimTableComponent {

  public label: string = 'Create new';
  public icon: string = 'add';
  public claimList: Claim[] = [];
  public claimTableColumns: any[] = [];
  public claims$!: Observable<Claim[]>;

  constructor(
    private claimService: ClaimService,
    private dialogService: MatDialog,
    private store: Store<ClaimState>,
  ) {
    this.claims$ = this.store.select(selectAllClaims);
  }

  ngOnInit(): void {
    this.claimTableColumns = this.claimService.claimTableColumns;
    this.store.dispatch(loadClaims());
  }

  public getColumnHeaders(): string[] {
    return this.claimTableColumns.map(column => column.name);
  }

  public openClaim(): void {
    const dialog: any = this.dialogService.open(ClaimDialogComponent, {
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '200ms'
    });
    dialog.afterClosed().subscribe((result: any) => { });
  }

  public onItemClick(claim: Claim): void {
    this.store.dispatch(setCurrentClaim({ claim }));
    this.openClaim();
  }
}
