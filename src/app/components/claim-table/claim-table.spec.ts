import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimTableComponent } from './claim-table.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';


describe('ClaimTableComponent', () => {
  let component: ClaimTableComponent;
  let fixture: ComponentFixture<ClaimTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimTableComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

