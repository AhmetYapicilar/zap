import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoingameComponent } from './dialog-joingame.component';

describe('DialogJoingameComponent', () => {
  let component: DialogJoingameComponent;
  let fixture: ComponentFixture<DialogJoingameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogJoingameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogJoingameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
