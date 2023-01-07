import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryByEmailComponent } from './recovery-by-email.component';

describe('RecoveryByEmailComponent', () => {
  let component: RecoveryByEmailComponent;
  let fixture: ComponentFixture<RecoveryByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryByEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
