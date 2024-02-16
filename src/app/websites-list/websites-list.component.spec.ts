import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesListComponent } from './websites-list.component';

describe('WebsitesListComponent', () => {
  let component: WebsitesListComponent;
  let fixture: ComponentFixture<WebsitesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebsitesListComponent]
    });
    fixture = TestBed.createComponent(WebsitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
