import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTaskDialogComponent } from './details-task-dialog.component';

describe('DetailsTaskDialogComponent', () => {
  let component: DetailsTaskDialogComponent;
  let fixture: ComponentFixture<DetailsTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTaskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
