import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduListComponent } from './edu-list.component';

describe('EduListComponent', () => {
  let component: EduListComponent;
  let fixture: ComponentFixture<EduListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
