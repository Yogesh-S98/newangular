import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTableComponent } from './set-table.component';

describe('SetTableComponent', () => {
  let component: SetTableComponent;
  let fixture: ComponentFixture<SetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetTableComponent]
    });
    fixture = TestBed.createComponent(SetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
