import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineCardsModalComponent } from './combine-cards-modal.component';

describe('CombineCardsModalComponent', () => {
  let component: CombineCardsModalComponent;
  let fixture: ComponentFixture<CombineCardsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineCardsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineCardsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
