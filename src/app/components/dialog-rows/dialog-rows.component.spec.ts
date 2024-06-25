import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRowsComponent } from './dialog-rows.component';

describe('DialogRowsComponent', () => {
  let component: DialogRowsComponent;
  let fixture: ComponentFixture<DialogRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
