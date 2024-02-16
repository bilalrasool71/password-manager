import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordListComponent } from './password-list.component';

describe('PasswordListComponent', () => {
  let component: PasswordListComponent;
  let fixture: ComponentFixture<PasswordListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordListComponent]
    });
    fixture = TestBed.createComponent(PasswordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
